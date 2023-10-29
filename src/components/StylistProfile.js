import { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import client from '../utils/Client';
import styles from './styles/UserProfile.module.scss';

export function StylistProfile() {

	const [isUpdating, setIsUpdating] = useState(null);
	const { auth, setAuth } = useContext(AuthContext);
	const [selectedGender, setSelectedGender] = useState(null);
	const [selectedStylistFor, setSelectedStylistForr] = useState(null);
	const refName = useRef(null);
	const refPhone = useRef(null);
	const navigate = useNavigate();

	const {state} = useLocation();
	const email = state?.email;

	useEffect(() =>{
		
	}, []);

	const handleSuccess = (data) => {
		setAuth({...auth, user: {...data}});
		navigate("/partner");
	};

	const handleSubmit = () => {
		setIsUpdating(true);

		const name = refName.current.value;
		const phone = refPhone.current.value;

		client.patch("/stylist", {
			"name": name,
			'phone': phone,
			'email': email,
			'gender': selectedGender,
			'stylist_for': selectedStylistFor
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
			<div className={styles.container}>
				<Row className="justify-content-md-center">
					<p className={`mb-4 h1 ${styles.title}`}>Profile</p>
					<Col>
						<Form onSubmit={ (e) => {e.preventDefault(); handleSubmit();} }>
							<Form.Group className="mb-4" controlId="formName">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" 
									placeholder="Enter Name..." 
									// defaultValue={auth?.name} 
									// value={name}
									ref={refName}/>
							</Form.Group>

							<Form.Group className="mb-4" controlId="formName">
								<Form.Label>Phone</Form.Label>
								<Form.Control type="tel" 
									placeholder="Enter Phone..." 
									// value={phone}
									// defaultValue={auth?.name} 
									ref={refPhone}
									/>
							</Form.Group>

							<Form.Group className="mb-4" controlId="formGender">
								<Form.Label>Gender</Form.Label>
								<div>
									<Form.Check
										inline
										type="radio"
										name="groupGender"
										defaultChecked = {auth?.gender === 'male'}
										onChange={ () => setSelectedGender("HE") }
										label={`Male`} />

									<Form.Check
										inline
										type="radio"
										name="groupGender"
										defaultChecked = {auth?.gender === 'female'}
										onChange={ () => setSelectedGender("SHE") }
										label={`Female`} />
								</div>
							</Form.Group>

							<Form.Group className="mb-4" controlId="formStylistFor">
								<Form.Label>Stylist For</Form.Label>
								<div>
									<Form.Check
										inline
										type="radio"
										name="groupStylistFor"
										defaultChecked = {auth?.gender === 'male'}
										onChange={ () => setSelectedStylistForr("HE") }
										label={`Male`} />

									<Form.Check
										inline
										type="radio"
										name="groupStylistFor"
										defaultChecked = {auth?.gender === 'female'}
										onChange={ () => setSelectedStylistForr("SHE") }
										label={`Female`} />

									<Form.Check
										inline
										type="radio"
										name="groupStylistFor"
										defaultChecked = {auth?.gender === 'unisex'}
										onChange={ () => setSelectedStylistForr("UNISEX") }
										label={`Unisex`} />
								</div>
							</Form.Group>

							<div className="d-grid gap-2 mt-4">
								<Button variant="primary" type="submit" disabled={isUpdating}>
									Update
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default StylistProfile;