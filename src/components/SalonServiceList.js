import { React, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import styles from './styles/SalonServiceList.module.scss';
import { useParams } from 'react-router-dom';
import client from '../utils/Client';
import SalonServiceListItem from './SalonServiceListItem';

export function SalonServiceList({onSelection}) {
	const [serviceList, setServiceList] = useState([]);
	const [selectedServices, setSelectedServices] = useState(new Set());
	const { salonId } = useParams();

	useEffect(() => {
		client.get(`/salon/${salonId}/services`)
			.then(response => response.data)
			.then(setServiceList)
			.catch(errors => console.error(errors));
	}, [salonId]);

	const handleSelectionChange = (selection) => {
		const serviceId = selection?.id;
		const newSelection = new Set(selectedServices);
		if(selection?.selected) {
			newSelection.add(serviceId);
		}
		else {
			newSelection.delete(serviceId);
		}

		setSelectedServices(newSelection);
		onSelection(newSelection);
	};

	return (
		<>
			<div className={`${styles.flexContainer} mb-3`}>
				<div className={styles.title}>Select Services</div>
			</div>
			<Row xs="3">
				{serviceList.map( (service, index) => (
					<SalonServiceListItem 
						service={service} 
						key={index} 
						onSelectionChange={handleSelectionChange}
						selected={selectedServices.has(service?.id)}/>
				))}
			</Row>
		</>
	);
}

export default SalonServiceList;