import { React, useEffect, useState } from 'react';
import styles from './styles/SalonDetails.module.scss';
import { Container, Row } from 'react-bootstrap';

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

	const handleSubmit = () => {
		client.post('/slot/reserve')
			.then(response => response.data)
			.then(data => ({
				bookingId: data?.booking_id,
				status: data?.status
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

	const handleSlotSelection = (slot) => {
		setSelectedSlot(slot);
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
			<Container 
				className={`px-4 py-3 text-end ${styles.parentContainer} ${styles.fixedBottom} ${styles.footer}`}
				onClick={handleSubmit}
			>
				<div className={styles.top}>
					<div className={styles.bottom}>Book</div>
				</div>
			</Container>
		</>
	);
}

export default SalonDetails;