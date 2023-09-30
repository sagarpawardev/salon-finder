import { React, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import styles from './styles/StylistList.module.scss';
import { useParams } from 'react-router-dom';
import client from '../utils/Client';
import StylistListItem from './StylistListItem';

export function StylistList({onSelection}) {
	const [stylistList, setStylistList] = useState([]);
	const { salonId } = useParams();

	useEffect(() => {
		client.get(`/salon/${salonId}/stylists`)
			.then(response => response.data)
			.then(setStylistList)
			.catch(errors => console.error(errors));
	}, [salonId]);

	const [selected, setSelected] = useState(null);

	const handleSelected = (stylist) => {
		setSelected(stylist);
		onSelection(stylist);
	};

	return (
		<>
			<div className={`${styles.flexContainer} mb-3`}>
				<div className={styles.title}>Select Stylist</div>
			</div>
			<Row xs="3" md="4" lg="6">
				{stylistList.map( (stylist, index) => (
					<StylistListItem 
						stylist={stylist} 
						key={index} 
						onSelect={handleSelected} 
						selected={ selected?.id === stylist?.id }/>
				))}
			</Row>
		</>
	);
}

export default StylistList;