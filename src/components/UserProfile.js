import { useContext, useEffect, useRef, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../App';
import { apiBaseUrl } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {

	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);
	const [selectedGender, setSelectedGender] = useState(null);
	const [isUpdating, setIsUpdating] = useState(null);
	const { auth, setAuth } = useContext(AuthContext);
	const refName = useRef(null);
	const navigate = useNavigate();

	const client = axios.create({
		baseURL:  apiBaseUrl()
	});

	useEffect(() =>{
		setCities([
			...cities,
			{ id: 1, name: "Pune" },
			{ id: 2, name: "Mumbai" }
		]);

		setSelectedCity(auth?.city);
		setSelectedGender(auth?.gender);
	}, []);

	const handleSuccess = (data) => {
		setAuth({...auth, user: {...data}});
		navigate("/");
	};

	const handleSubmit = () => {
		setIsUpdating(true);

		const name = refName.current.value;
		const gender = selectedGender;
		const city = selectedCity;

		client.patch("/user", {
			"name": name,
			'gender': gender,
			'city': city,
		}).then( response => {
			if(response?.data){
				handleSuccess(response.data);
			}
			else{
				console.error('failed to update preferences');
				console.error(response.data);
			}
		})
		.catch(errors => console.error(errors))
		.finally( () => {
			setIsUpdating(false);
		});
		
	}

	return (
		<>
			<div className='signin-center-container'>
				<Row className="justify-content-md-center">
					<p className='mb-4 h1 signin-title'>Profile</p>
					<Col>
						<Form onSubmit={ (e) => {e.preventDefault(); handleSubmit();} }>
							<Form.Group className="mb-4" controlId="formName">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" 
									placeholder="Enter Name..." 
									defaultValue={auth?.name} 
									ref={refName}/>
							</Form.Group>

							<Form.Group className="mb-4" controlId="formGender">
								<Form.Label>Gender</Form.Label>
								<div>
									<Form.Check
										inline
										type="radio"
										name="groupGender"
										defaultChecked = {auth?.gender === 'male'}
										onChange={ () => setSelectedGender("male") }
										label={`Male`} />

									<Form.Check
										inline
										type="radio"
										name="groupGender"
										defaultChecked = {auth?.gender === 'female'}
										onChange={ () => setSelectedGender("male") }
										label={`Female`} />
								</div>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formPreferredCity">
								<Form.Label>Preferred City</Form.Label>
								<div >
									<Dropdown className="d-grid gap-2">
										<Dropdown.Toggle
											variant={selectedCity ? "outline-success" : "outline-secondary"}>
											{selectedCity ? selectedCity.name : 'Select City'}
										</Dropdown.Toggle>

										<Dropdown.Menu
											variant="light">
											{
												cities.map((city) => (
													<Dropdown.Item key={city.id} 
														onClick={() => { setSelectedCity(city) }}>
														{city.name}
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

export default UserProfile;