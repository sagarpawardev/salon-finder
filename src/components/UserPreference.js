import { useContext, useEffect, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../App';
import { createSearchParams, useNavigate } from 'react-router-dom';
import client from '../utils/Client';
import styles from './styles/UserProfile.module.scss';

export function UserPreference() {

	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);
	const [localities, setLocalities] = useState([]);
	const [selectedLocality, setSelectedLocality] = useState(null);
	const [selectedGender, setSelectedGender] = useState(null);
	const [isUpdating, setIsUpdating] = useState(null);
	const { auth, setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() =>{

		client.get('/city')
			.then(response => response.data)
			.then(response => {
				setCities(response.city_list);
		});

		setSelectedCity(auth?.city);
		setSelectedGender(auth?.gender);

	}, []);

	const handleSuccess = (data) => {
		setAuth({...auth, user: auth.user});
		navigate({
			pathname: "/search",
			search: createSearchParams({
				locality: selectedLocality.id
			}).toString()
		});
	};

	const handleSubmit = () => {
		setIsUpdating(true);

		const gender = selectedGender;

		client.patch("/updatePreference", {
			"city_id": selectedCity?.id,
			'gender': gender,
			'locality_id': selectedLocality?.id,
		}).then( response => {
			// if(response?.data){
				handleSuccess(response.data);
			// }
			// else{
			// 	console.error('failed to update preferences');
			// 	console.error(response.data);
			// }
		})
		.catch(errors => console.error(errors))
		.finally( () => {
			setIsUpdating(false);
		});
	}

	const handleCitySelected = (city) => {
		console.log('selected city')
		console.log(city)
		setSelectedCity(city);

		client.get('/locality/city/' + city.id)
			.then(response => response.data)
			.then(response => {
				setLocalities(response.locality_response_list);
			});
	}

	return (
		<>
			<div className={styles.container}>
				<Row className="justify-content-md-center">
					<p className={`mb-4 h1 ${styles.title}`}>Profile</p>
					<Col>
						<Form onSubmit={ (e) => {e.preventDefault(); handleSubmit();} }>
							<Form.Group className="mb-4" controlId="formGender">
								<Form.Label>Gender</Form.Label>
								<div>
									<Form.Check
										required
										inline
										type="radio"
										name="groupGender"
										defaultChecked = {auth?.gender === 'male'}
										onChange={ () => setSelectedGender("HE") }
										label={`Male`} />

									<Form.Check
										required
										inline
										type="radio"
										name="groupGender"
										defaultChecked = {auth?.gender === 'female'}
										onChange={ () => setSelectedGender("SHE") }
										label={`Female`} />
								</div>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formPreferredCity">
								<Form.Label>Preferred City</Form.Label>
								<div >
									<Dropdown className="d-grid gap-2" required>
										<Dropdown.Toggle
											variant={selectedCity ? "outline-success" : "outline-secondary"}>
											{selectedCity ? selectedCity.city : 'Select City'}
										</Dropdown.Toggle>

										<Dropdown.Menu
											variant="light">
											{
												cities.map((city) => (
													<Dropdown.Item key={city.id} 
														onClick={() => { handleCitySelected(city) }}>
														{city.city}
													</Dropdown.Item>
												))
											}

										</Dropdown.Menu>
									</Dropdown>
								</div>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formPreferredCity">
								<Form.Label>Preferred Locality</Form.Label>
								<div >
									<Dropdown className="d-grid gap-2" required>
										<Dropdown.Toggle
											variant={selectedLocality ? "outline-success" : "outline-secondary"}>
											{selectedLocality ? selectedLocality.locality : 'Select City'}
										</Dropdown.Toggle>

										<Dropdown.Menu
											variant="light">
											{
												localities.map((locality) => (
													<Dropdown.Item key={locality.id} 
														className={styles.dropdownMenu}
														onClick={() => { setSelectedLocality(locality) }}>
														{locality.locality}
													</Dropdown.Item>
												))
											}

										</Dropdown.Menu>
									</Dropdown>
								</div>
							</Form.Group>

							<div className="d-grid gap-2 mt-4">
								<Button variant="primary" type="submit" disabled={isUpdating}>
									Update Preferences
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default UserPreference;