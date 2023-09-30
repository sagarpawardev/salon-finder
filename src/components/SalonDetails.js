import { React, useEffect, useState } from 'react';
import styles from './styles/SalonDetails.module.scss';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';
import client from '../utils/Client';
import RatingStar from './RatingStar';
import { GeoAltFill, Watch } from 'react-bootstrap-icons';
import SalonStylist from './SalonStylist';

export function SalonDetails() {
	const [serviceList, setServiceList] = useState([]);
	const [selectedServiceSet, setSelectedServiceSet] = useState(new Set());
	const { salonId } = useParams();

	//TODO: Remove this
	const salon = {
		id: 1,
		name: 'Toni & Guy Hairdressing Salon Gachibowli ',
		rating: {
			value: 4.5,
			count: '11,305',
		},
		location: 'Gachibowli, Hyderabad',
		workingTime: '9:00 AM - 9:00 PM',
	}

	const navigate = useNavigate();

	const handleServiceRemoved = (event) => {
		const serviceId = event.target.dataset.serviceId;
		selectedServiceSet.delete(serviceId);
		setSelectedServiceSet(new Set(selectedServiceSet));
	}

	const handleServiceSelected = (event) => {
		const serviceId = event.target.dataset.serviceId;
		selectedServiceSet.add(serviceId);
		setSelectedServiceSet(new Set(selectedServiceSet));
	}

	const getSelectionButton = (service) => {
		if(selectedServiceSet.has(service.id)) {
			return (
				<Button variant="primary" className="btn-select" data-service-id={service.id} onClick={handleServiceRemoved}>
					Selected
				</Button>
			);
		}
		else {
			return (
				<Button variant="outline-primary" className="btn-select" data-service-id={service.id} onClick={handleServiceSelected}>Add</Button>
			);
		}
	}

	const handleChooseStylistsClick = () => {
		navigate(`/salon/${salonId}/stylist`, {
			state: {
				selectedServiceSet,
			}
		});
	};

	useEffect(() => {
		client.get(`/salon/${salonId}`)
			.then(response => response.data)
			.then(setServiceList)
			.catch(errors => console.error(errors));
	}, [salonId]);

	return (
		<>
			<Container className={`px-4 py-3 ${styles.parentContainer}`}>
				<Row className={`justify-content-md-center my-2 ${styles.salonName}`}>
					<Col>
						{salon.name}
					</Col>
				</Row>

				<Row className="justify-content-md-center my-1">
					<Col className={`text-muted ${styles.smallText}`}>
						<span>{salon?.rating?.value}</span>
						<span className='mx-1'>
							<RatingStar value={salon?.rating?.value}></RatingStar>
						</span>
						<span>({salon?.rating?.count})</span>
					</Col>
				</Row>

				<Row className={`text-muted ${styles.smallText}`}>
					<Col className='my-1'>
						<span>
							<GeoAltFill size={12} className="align-baseline"/>
						</span>
						<span className={`${styles.paddedText}`}>
							{salon?.location}
						</span>
					</Col>
				</Row>

				<Row className={`text-muted ${styles.smallText}`}>
					<Col className='my-1'>
						<span>
							<Watch size={12} className="align-baseline"/>
						</span>
						<span className={`${styles.paddedText}`}>
							{salon?.workingTime}
						</span>
					</Col>
				</Row>

				<Row>
					<Col>
						<SalonStylist></SalonStylist>
					</Col>
				</Row>
			</Container>
		</>
		// <>
		// 	<Container className='mt-2 mb-5'>
		// 		<Row xs="1" md="3" className='gy-5'>
		// 			{serviceList?.map( (service, index) => (
		// 				<Col key={index}>
		// 					<Card className={"card"}>
		// 						<Card.Img variant="top" src={service.image} />
		// 						<Card.Body>
		// 							<Card.Title>{service.name}</Card.Title>
		// 							<Card.Text className="mb-2 text-muted">{service.description}</Card.Text>
		// 							{ getSelectionButton(service) }
		// 						</Card.Body>
		// 					</Card>
		// 				</Col>
		// 			))}
		// 		</Row>
		// 	</Container>
			
		// 	{ selectedServiceSet.size > 0 &&
		// 		<div className="fixed-bottom">
		// 			<Button size="lg" className='btn-max-width' onClick={handleChooseStylistsClick}>Choose Stylist</Button>
		// 		</div>
		// 	}
		// </>
	);
}

export default SalonDetails;