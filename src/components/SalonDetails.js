import { React, useEffect, useState } from 'react';
import styles from './styles/SalonDetails.module.scss';
import { Container, Row } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';
import client from '../utils/Client';
import { StylistList } from './StylistList';
import SalonServiceList from './SalonServiceList';
import SalonHeader from './SalonHeader';

export function SalonDetails() {
	const [salon, setSalon] = useState({});
	const [selectedServiceSet, setSelectedServiceSet] = useState(new Set());
	const [selectedStylistId, setSelectedStylistId] = useState(undefined);

	const { salonId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		client.get(`/salon/${salonId}`)
			.then(response => response.data)
			.then(setSalon)
			.catch(errors => console.error(errors));
	}, [salonId]);

	const handleServiceSelection = (serviceIdSet) => {
		setSelectedServiceSet(serviceIdSet);
	};

	const handleStylistSelection = (stylistId) => {
		setSelectedStylistId(stylistId);
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
			</Container>
		</>
	);
}

export default SalonDetails;