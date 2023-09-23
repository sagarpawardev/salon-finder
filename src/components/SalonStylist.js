import { React, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';
import client from '../utils/Client';

export function SalonStylist() {
	const [stylistList, setStylistList] = useState([]);
	const { salonId } = useParams();

	const RESERVED = 'RESERVED';

	const navigate = useNavigate();

	const handleBookingStatus = (reservation) => {
		if(reservation?.status === RESERVED) {
			navigate(`/book/${reservation?.bookingId}/confirm`);
		}
		else {
			//TODO: handle error
			throw new Error('Error not handled');
		}
	}

	const handleStylistClick = (event) => {
		client.post('/slot/reserve')
			.then(response => response.data)
			.then(data => ({
				bookingId: data?.booking_id,
				status: data?.status
			}))
			.then(handleBookingStatus)
			.catch(errors => console.error(errors));
	};

	useEffect(() => {
		client.get(`/salon/${salonId}/stylists`)
			.then(response => response.data)
			.then(setStylistList)
			.catch(errors => console.error(errors));
	}, [salonId]);

	return (
		<>
			<Container className='mt-2 mb-5 text-center'>
				<Row xs="1" md="3" className='gy-5'>
					{stylistList.map( (stylist, index) => (
						<Col key={index}>
							<Card className={"card"}>
								<Card.Img variant="top" src={stylist.profilUrl} />
								<Card.Body>
									<div>8000+ Sessions</div>
									<h1 className='text-uppercase'>{stylist.name}</h1>
									<Button variant="primary" className="btn-select" data-stylist-id={stylist.id} onClick={handleStylistClick}>
										Choose Stylist
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
}

export default SalonStylist;