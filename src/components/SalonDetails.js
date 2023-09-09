import { React, useContext, useEffect, useState } from 'react'
import './styles/SalonDetails.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../utils';
import { AuthContext } from '../App';

export function SalonDetails() {
	const [serviceList, setServiceList] = useState([]);
	const [selectedServiceSet, setSelectedServiceSet] = useState(new Set());

	const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

	const client = axios.create({
		baseURL:  apiBaseUrl()
	});

	const populateSalonList = () => {
		//TODO: Implement this
		const mockServices = [];
		for(let i=0; i<5; i++){
			mockServices.push(
				{
					id: "HAIR_CUT",
					name: "Hair Cut",
					image: "https://img.freepik.com/premium-photo/young-man-with-trendy-haircut-barber-shop-barber-does-hairstyle-beard-trim_179755-8607.jpg",
					description: "Transform your style, embrace confidence, and own the spotlight with us!",
				}
			);

			mockServices.push(
				{
					name: "Face Massage",
					id: "FACE_MASSAGE",
					image: "https://thumbs.dreamstime.com/z/face-massage-barbershop-smiling-men-beard-closed-eyes-black-cutting-hair-cape-barber-tattoo-black-t-80662652.jpg?w=992",
					description: "Rediscover radiant tranquility; rejuvenate your glow with our soothing face massage."
				}
			);
		}

		setServiceList(mockServices);

		// client.get('/salon')
		// .then(response => response.data)
		// .then(data => {
		// 	setSalonList(data);
		// })
		// .catch(errors => console.error(errors));
	};

	const handleShowDetails = (event) => {
		const selectedSalonId = event.target?.dataset?.salonId;
		navigate(`/salon/${selectedSalonId}`);
		//navigate(`/book?salonId=${selectedSalonId}`);
	};

	const handleAuthUser = () => {
		if(auth?.user?.city && auth?.user?.gender){
			populateSalonList();
		}
		else{
			navigate('/profile');
		}
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

	useEffect(() => {
		if (!auth) {
			populateSalonList();
		}
		else {
			handleAuthUser();
		}
		
	}, []);

	return (
		<>
			<Container className='mt-2 mb-5'>
				<Row xs="1" md="3" className='g-5'>
					{serviceList.map( (service, index) => (
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
				<div class="fixed-bottom">
					<Button size="lg" className='btn-max-width'>Choose Stylist</Button>
				</div>
			}
		</>
	);
}

export default SalonDetails;