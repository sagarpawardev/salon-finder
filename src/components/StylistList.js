import { React, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import styles from './styles/StylistList.module.scss';
import { useParams } from 'react-router-dom';
import client from '../utils/Client';
import StylistListItem from './StylistListItem';

export function StylistList({onSelection}) {
	const [stylistList, setStylistList] = useState([]);
	const { salonId } = useParams();
	const NUM_IMAGES_IN_PUBLIC_STYLIST = 3;

	useEffect(() => {
		client.get(`/salon/${salonId}/stylists/available`)
			.then(response => response.data)
			.then(data => mapStylistList(data))
			.then(data => setStylistList(data.stylist_list))
			.catch(errors => console.error(errors));
	}, [salonId]);

	const [selected, setSelected] = useState(null);

	const handleSelected = (stylist) => {
		setSelected(stylist);
		onSelection(stylist);
	};

	const randomNumberLessThan = (max) => Math.floor(Math.random() * max) + 1;

	const mapStylistList = (data) => {
		const stylistList = data?.stylist_list?.map( stylist => {
			const randomNumber = randomNumberLessThan(NUM_IMAGES_IN_PUBLIC_STYLIST);
			return {
				photo: stylist?.gender==='HE' ? `/stylists/he/${randomNumber}.jpg` : `/stylists/she/${randomNumber}.jpg`,
				...stylist
			};
		});

		return {
			...data,
			stylist_list: stylistList
		}
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
						selected={ selected?.stylist_id === stylist?.stylist_id }/>
				))}
			</Row>
		</>
	);
}

export default StylistList;