import { React, useContext, useEffect, useState } from 'react'
import styles from './styles/SaloonList.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import client from '../utils/Client';
import { AuthContext } from '../App';
import SaloonListItem from './SaloonListItem';

export function SaloonList() {
	const [salonList, setSalonList] = useState([]);
	const [city, setCity] = useState(undefined);
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();

	const localityId = new URLSearchParams(useLocation().search).get("locality")

	const handleLocationClick = (event) => {
		event.preventDefault();
		navigate('/profile');
	};

	const handleClickSalon = (event) => {
		const selectedSalonId = event.currentTarget?.dataset?.salonId;
		navigate(`/salon/${selectedSalonId}`);
	};

	useEffect(() => {
		client.get('/salonsForUser')
			.then(response => response.data)
			.then(data => {
				setSalonList(data.salon_list)
			})
			.catch(errors => console.error(errors));
	}, [auth?.user?.city?.name]);

	return (
		<>
			<Container>
				<Row className={`${styles.listHeader} justify-content-md-center`}>
					<Col lg="8">
						Salons in your area..
					</Col>
				</Row>

				<Row className="justify-content-md-center">
					<Col md="auto">
						{salonList.map((salon, index) => (
							<div key={index} data-salon-id={salon?.salon_id} onClick={handleClickSalon} className={styles.clickable}>
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