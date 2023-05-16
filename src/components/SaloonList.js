import React from 'react'
import './styles/SaloonList.css';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export class SaloonList extends React.Component {
	render() {
		let data = this.mockData();
		return (
			<>
				<div className='saloon-list-container'>
					<Row className="justify-content-md-center">
						<Col md="auto">
							{data.salonList.map((salon) => (
								<div className='salon-list-item shadow-sm p-2 m-2 bg-white rounded'>
									<Row>
										<Col xs='3' lg='3'>
											<Image src={salon.photo} rounded fluid />
										</Col>
										<Col xs='9' lg='9'>
											<h5 className='salon-list-text-left'>{salon.name}</h5>
											<Row>
												<Col xs='1' ><FontAwesomeIcon icon={faLocationDot} /></Col>
												<Col xs='10' className='salon-list-text-left text-muted'>{salon.address}</Col>
											</Row>
											<Row>
												<Col xs='1'><FontAwesomeIcon icon={faClock} /></Col>
												<Col xs='10' className='salon-list-text-left text-muted'>{salon.workingTime}</Col>
											</Row>
											<Row className='mt-3'>
												<Col className='salon-list-text-left'>
													<Button variant="primary" size="xs" active>
														Book for &#8377;{salon.price}
													</Button>
												</Col>
											</Row>
										</Col>
									</Row>
								</div>
							))}
						</Col>
					</Row>
				</div>
			</>
		);
	}

	mockData(count = 5) {
		const salonList = [];
		for (var i = 0; i < count; i++) {
			salonList.push({
				id: "234567",
				name: "Bob Unisex Saloon",
				address: "Gachibowli, Hyderabad", //XXX: this can be array
				phone: "+919876543210",
				type: "HE", //XXX: this can be array
				photo: "https://picsum.photos/200", //XXX: placeholder photo
				workingTime: "9:00 AM - 9:00 PM", //XXX: Add this
				price: "90"
			});
		}
		return {
			salonList
		};
	}
}

export default SaloonList;