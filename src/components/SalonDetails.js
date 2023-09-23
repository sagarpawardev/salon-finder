import { React, useEffect, useState } from 'react'
import './styles/SalonDetails.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';
import client from '../utils/Client';

export function SalonDetails() {
	const [serviceList, setServiceList] = useState([]);
	const [selectedServiceSet, setSelectedServiceSet] = useState(new Set());
	const { salonId } = useParams();

	const navigate = useNavigate();

	const populateSalonList = () => {
		client.get('/salon/1')
			.then(response => response.data)
			.then(setServiceList)
			.catch(errors => console.error(errors));
	};

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
		populateSalonList();
	}, []);

	return (
		<>
			<Container className='mt-2 mb-5'>
				<Row xs="1" md="3" className='gy-5'>
					{serviceList?.map( (service, index) => (
						<Col key={index}>
							<Card className={"card"}>
								<Card.Img variant="top" src={service.image} />
								<Card.Body>
									<Card.Title>{service.name}</Card.Title>
									<Card.Text className="mb-2 text-muted">{service.description}</Card.Text>
									{ getSelectionButton(service) }
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
			
			{ selectedServiceSet.size > 0 &&
				<div className="fixed-bottom">
					<Button size="lg" className='btn-max-width' onClick={handleChooseStylistsClick}>Choose Stylist</Button>
				</div>
			}
		</>
	);
}

export default SalonDetails;