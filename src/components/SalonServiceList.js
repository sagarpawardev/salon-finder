import { React, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import styles from './styles/SalonServiceList.module.scss';
import { useParams } from 'react-router-dom';
import client from '../utils/Client';
import SalonServiceListItem from './SalonServiceListItem';

export function SalonServiceList({onSelection}) {
	const [serviceList, setServiceList] = useState([]);
	const [selectedServices, setSelectedServices] = useState({});
	const { salonId } = useParams();

	useEffect(() => {
		client.get(`/salon/${salonId}/services`)
			.then(response => response.data)
			.then(setServiceList)
			.catch(errors => console.error(errors));
	}, [salonId]);

	const handleSelectionChange = (selection) => {
		const serviceId = selection?.service?.id;
		const newSelection = {...selectedServices};
		if(selection?.selected) {
			newSelection[serviceId] = selection?.service;
		}
		else {
			delete newSelection[serviceId];
		}

		setSelectedServices(newSelection);
		onSelection(Object.values(newSelection));
	};

	return (
		<>
			<div className={`${styles.flexContainer} mb-3`}>
				<div className={styles.title}>Select Services</div>
			</div>
			<Row xs="3" md="4" lg="6">
				{serviceList.map( (service, index) => (
					<SalonServiceListItem 
						service={service} 
						key={index} 
						onSelectionChange={handleSelectionChange}
						selected={selectedServices[service?.id]}/>
				))}
			</Row>
		</>
	);
}

export default SalonServiceList;