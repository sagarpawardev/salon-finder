import { React, useContext, useEffect, useState } from 'react'
import './styles/SaloonList.css';
import { Button, Col, Image, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../utils';
import { AuthContext } from '../App';

export function SaloonList() {
	const [salonList, setSalonList] = useState([]);
	const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

	const client = axios.create({
		baseURL:  apiBaseUrl()
	});

	const populateSalonList = () => {
		
		client.get('/salon')
		.then(response => response.data)
		.then(data => {
			setSalonList(data);
		})
		.catch(errors => console.error(errors));
	};

	const handleBook = (event) => {
		const selectedSalonId = event.target?.dataset?.salonId;
		navigate(`/book?salonId=${selectedSalonId}`);
	};

	const handleAuthUser = () => {
		if(auth?.user?.city && auth?.user?.gender){
			populateSalonList();
		}
		else{
			navigate('/profile');
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
			<div className='saloon-list-container'>
				<Row className="justify-content-md-center">
					<Col md="auto">
						{salonList.map((salon) => (
							<div className='salon-list-item shadow-sm p-2 m-2 bg-white rounded' key={salon.id}>
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
												<Button variant="primary" size="xs" data-salon-id={salon.id} active onClick={handleBook}>
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



export default SaloonList;