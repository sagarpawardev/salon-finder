import { React, useContext, useEffect, useState } from 'react'
import './styles/SalonStylist.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../utils';
import { AuthContext } from '../App';

export function SalonStylist() {
	const [stylistList, setStylistList] = useState([]);
	const { salonId } = useParams();
	const { state } = useLocation();
	const { selectedServiceSet } = state;

	const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

	const client = axios.create({
		baseURL:  apiBaseUrl()
	});

	const populateStylist = () => {
		//TODO: Implement this
		const mockStylists = [
			{
				id: "1",
				name: "Karan Johar",
				profilUrl: "https://media.istockphoto.com/id/494711330/photo/latin-young-man-in-a-studio.jpg?s=612x612&w=0&k=20&c=GAnGe6i43pLhhPPomrFF7aohc2uGsWGk1N2EHzLyJJw=",
			},
			{
				id: "2",
				name: "Katrina Kaif",
				profilUrl: "https://img.freepik.com/free-photo/young-woman-standing-with-arms-crossed_176474-95301.jpg?t=st=1694347310~exp=1694347910~hmac=d0f01fd5c8e40ba108e4377e019185f3e73f61616b113ee7634fe4e20a9e9f59",
			},
		];

		setStylistList(mockStylists);

		// client.get('/salon')
		// .then(response => response.data)
		// .then(data => {
		// 	setSalonList(data);
		// })
		// .catch(errors => console.error(errors));
	};

	const handleAuthUser = () => {
		if(auth?.user?.city && auth?.user?.gender){
			populateStylist();
		}
		else{
			navigate('/profile');
		}
	};

	const handleStylistClick = (event) => {
		const stylistId = event.target.dataset.stylistId;
		navigate(`/salon/${salonId}/book`, {
			state: {
				stylistId,
				selectedServiceSet,
			}
		});
	};

	useEffect(() => {
		if (!auth) {
			populateStylist();
		}
		else {
			handleAuthUser();
		}
	}, []);

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