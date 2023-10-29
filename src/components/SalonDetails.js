import { React, useEffect, useState } from 'react';
import styles from './styles/SalonDetails.module.scss';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import moment from "moment";

import { useNavigate, useParams } from 'react-router-dom';
import client from '../utils/Client';
import { StylistList } from './StylistList';
import SalonServiceList from './SalonServiceList';
import SalonHeader from './SalonHeader';
import TimeSlotList from './TimeSlotList';

export function SalonDetails() {
	const [salon, setSalon] = useState({});
	const [selectedServices, setSelectedServices] = useState(new Set());
	const [selectedStylist, setSelectedStylist] = useState(undefined);
	const [selectedSlot, setSelectedSlot] = useState(undefined);
	const [selectedAfterMin, setSelectedAfterMin] = useState(undefined);
	const [availableSlot, setAvailableSlot] = useState(undefined);

	const { salonId } = useParams();
	const navigate = useNavigate();

	const RESERVED = 'RESERVED';

	useEffect(() => {
		client.get(`/salon/${salonId}`)
			.then(response => response.data)
			.then(setSalon)
			.catch(errors => console.error(errors));
	}, [salonId]);

	const handleBookingStatus = (reservation) => {
		if(reservation?.status === RESERVED) {
			navigate(`/book/${reservation?.bookingId}/confirm`);
		}
		else {
			//TODO: handle error
			throw new Error('Error not handled');
		}
	}

	const findSlot = () => {
		client.post('/nextSlot', {
			services: selectedServices,
			stylist_id: selectedStylist.stylist_id,
			salon_id: salonId,
			after_min: selectedAfterMin?.value,
			start_time: selectedSlot?.value
		})
			.then(response => response.data)
			.then(data => 
				setAvailableSlot(data.available_slots[0])
			)
			.then(handleBookingStatus)
			.catch(errors => console.error(errors));
	}

	const handleSubmit = () => {
		var date = moment(new Date()).format('DD-MM-yyyy HH:mm:ss')
		client.post('/slot/reserve', {
			stylist_id: selectedStylist.stylist_id,
			date: date,
			salon_id: salonId,
			start_time: availableSlot.start_time,
			context: {
				services: selectedServices
			}
		})
			.then(response => response.data)
			.then(data => ({
				bookingId: data?.booking_id,
				status: data?.status,
				
			}))
			.then(handleBookingStatus)
			.catch(errors => console.error(errors));
	}

	const handleServiceSelection = (services) => {
		setSelectedServices(services);
	};

	const handleStylistSelection = (stylists) => {
		setSelectedStylist(stylists);
	};

	const handleSlotSelection = (slot, value) => {
		if (value === 'slot')
			setSelectedSlot(slot);
		else if (value === 'afterMin')
			setSelectedAfterMin(slot)
	};

	const isFooterVisible = () => {
		return selectedServices?.length && selectedStylist && (selectedSlot || selectedAfterMin);
	};

	return (
		<>
			<Container className={`px-4 py-3 ${styles.parentContainer}`}>
				<Row>
					<SalonHeader salon={salon}></SalonHeader>
				</Row>

				<Row className='mt-3'>
					<StylistList onSelection={handleStylistSelection}></StylistList>
				</Row>

				<Row className='mt-4'>
					<SalonServiceList onSelection={handleServiceSelection}></SalonServiceList>
				</Row>

				<Row className='mt-4'>
					<TimeSlotList 
						stylist={selectedStylist}
						services={selectedServices}
						onSelection={handleSlotSelection}
					></TimeSlotList>
				</Row>
				<Row className='p-5'/>

			</Container>

			

			{ isFooterVisible() && (
				<div>
				<FindSlot onSubmit={findSlot}></FindSlot>

				<FixedFooter onSubmit={handleSubmit}></FixedFooter>
				</div>
			)}
		</>
	);
}

function FixedFooter({onSubmit}) {

	return (
		<>
			<Container 
				className={`px-4 py-3 text-end ${styles.parentContainer} ${styles.fixedBottom} ${styles.footer}`}
			>
				<div className={styles.top} onClick={onSubmit}>
					<div className={styles.bottom}>Book</div>
				</div>
			</Container>
		</>
	);
}

function FindSlot({onSubmit}) {
	return (
		<div className="d-grid gap-2">
				<Button className='mt-5' variant="primary" type="button" onClick={onSubmit}>
					Find Available Time
				</Button>
			</div>
	);
}

export default SalonDetails;