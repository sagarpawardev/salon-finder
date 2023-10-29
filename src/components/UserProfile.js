import { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import client from '../utils/Client';
import styles from './styles/UserProfile.module.scss';

export function UserProfile() {

	const [isUpdating, setIsUpdating] = useState(null);
	const { auth, setAuth } = useContext(AuthContext);
	const refName = useRef(null);
	const refPhone = useRef(null);
	const navigate = useNavigate();

	const {state} = useLocation();
	const email = state?.email;

	useEffect(() =>{
		
	}, []);

	const handleSuccess = (data) => {
		setAuth({...auth, user: {...data}});
		navigate("/preference");
	};

	const handleSubmit = () => {
		setIsUpdating(true);

		const name = refName.current.value;
		const phone = refPhone.current.value;

		client.patch("/user", {
			"name": name,
			'phone': phone,
			'email': email
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

export default UserProfile;