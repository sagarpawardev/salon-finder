import { React, useContext, useEffect, useState } from 'react'
import styles from './styles/SaloonList.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import client from '../utils/Client';
import { AuthContext } from '../App';
import SaloonListItem from './SaloonListItem';

export function SaloonList() {
	const [salonList, setSalonList] = useState([]);
	const [city, setCity] = useState(undefined);
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLocationClick = (event) => {
		event.preventDefault();
		navigate('/profile');
	};

	const handleClickSalon = (event) => {
		const selectedSalonId = event.currentTarget?.dataset?.salonId;
		navigate(`/salon/${selectedSalonId}`);
	};

	const mapSalon = (salonList) => {
		return salonList.map( (salon) => ({
			rating: {
				value: '5.0',
				count: 100,
			},
			...salon,
		}));
	};

	useEffect(() => {
		client.get('/salons', {
				params: {
					city: auth?.user?.city?.name,
			  	},
			})
			.then(response => response.data)
			.then(data => {
				setCity(data.city);
				return data.salons;
			})
			.then(mapSalon)
			.then(setSalonList)
			.catch(errors => console.error(errors));
	}, [auth?.user?.city?.name]);

	return (
		<>
			<Container>
				<Row className={`${styles.listHeader} justify-content-md-center`}>
					<Col lg="8">
						Salons in <u className={styles.cityPref} onClick={handleLocationClick}>{city}</u>
					</Col>
				</Row>

				<Row className="justify-content-md-center">
					<Col md="auto">
						{salonList.map((salon, index) => (
							<div key={index} data-salon-id={salon?.id} onClick={handleClickSalon} className={styles.clickable}>
								<SaloonListItem salon={salon}/>

								{	index !== salonList.length-1 && (
										<hr className={styles.rowDivider}/>
									)
								}
							</div>
						))}
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default SaloonList;