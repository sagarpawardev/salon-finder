import { React, useEffect, useState } from 'react'
import './styles/SaloonList.css';
import { Col, Container, Row } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import client from '../utils/Client';

export function BookingList() {
	const [bookingList, setBookingList] = useState([]);
	const navigate = useNavigate();

	const populateBookingList = () => {
		client.get('/bookings')
			.then(response => response.data)
			.then( setBookingList )
			.catch(errors => console.error(errors));
	};

	const handleClick = (event) => {
		const bookingId = event.currentTarget.dataset.id
		navigate(`/booking/${bookingId}`);
	};

	const getStatusClass = (status) => {
		switch(status?.toLowerCase()) {
			case 'confirmed': return 'text-success';
			case 'failed': return 'text-danger';
			case 'in progress': return 'text-warning';
			default: return null;
		}
	};

	useEffect(() => {
		populateBookingList();		
	}, []);

	return (
		<>
			<Container>
				<Row className="justify-content-md-center">
					<Col md={8}>
						{bookingList.map((booking, index) => (
							<Container className='my-3 p-2 shadow-sm bg-white rounded' key={index} data-id={booking.id} onClick={handleClick}>
								<Row>
									<Col>
										<div className='c-text-title'>{booking.salon}</div>
										<div className='c-text-small text-muted'>
											<Moment format='LL'>{booking.startTime}</Moment>
										</div>
									</Col>
									<Col xs="auto" className={ `${getStatusClass(booking.status)}` }>
										{booking.status}
									</Col>
								</Row>
							</Container>
						))}
					</Col>
				</Row>
			</Container>
		</>
	);
}



export default BookingList;