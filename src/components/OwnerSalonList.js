import { React, useContext, useEffect, useState } from 'react'
import styles from './styles/SaloonList.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import client from '../utils/Client';
import { AuthContext } from '../App';
import SaloonListItem from './SaloonListItem';

export function OwnerSalonList() {
	const [salonList, setSalonList] = useState([]);
	const { auth, setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleClickSalon = (event) => {
		const selectedSalonId = event.currentTarget?.dataset?.salonId;
		console.log(client.defaults.headers.common)
		setAuth({...auth, user: auth.user});
		navigate(`/partner/salon/${selectedSalonId}`);
	};

	useEffect(() => {
		client.get('/stylist/admin')
			.then(response => response.data)
			.then(data => {
				setSalonList(data.salon_list)
			})
			.catch(errors => console.error(errors));
	}, []);

	return (
		<>
			<Container>
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

export default OwnerSalonList;