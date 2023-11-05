import { React, useContext, useEffect, useState } from 'react'
import styles from './styles/SaloonList.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import client from '../utils/Client';
import { AuthContext } from '../App';
import SaloonListItem from './SaloonListItem';
import { toast } from 'react-toastify';

export function SaloonList() {
	const [salonList, setSalonList] = useState([]);
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();

	const NUM_IMAGES_IN_PUBLIC_SALON = 7;

	const handleClickSalon = (event) => {
		const selectedSalonId = event.currentTarget?.dataset?.salonId;
		navigate(`/salon/${selectedSalonId}`);
	};

	const randomNumberLessThan = (max) => Math.floor(Math.random() * max) + 1;

	const mapSalonList = (data) => {
		const salonList = data?.salon_list?.map( salon => {
			const randomNumber = randomNumberLessThan(NUM_IMAGES_IN_PUBLIC_SALON);
			return {
				photo: `/salons/${randomNumber}.jpg`,
				...salon
			};
		});

		return {
			...data,
			salon_list: salonList
		}
	};

	useEffect(() => {
		client.get('/salonsForUser')
			.then(response => response.data)
			.then(data => mapSalonList(data) )
			.then(data => setSalonList(data.salon_list))
			.catch(error => toast.error(error.message));
	}, []);

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
						{salonList?.map((salon, index) => (
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