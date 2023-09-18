import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles/SignupForm.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import client from '../utils/Client';

export function SignupForm() {
	const navigate = useNavigate();
	const name = useRef(null);
	const mobile = useRef(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		client.post("/user", {
				"name": name.current.value,
				"mobile": mobile.current.value,
			})
			.then(navigate("/verify"))
			.catch( errors => console.errors(errors));
	};

	return (
		<>
			<div className='signup-center-container'>
				<Row className="justify-content-md-center">
					<p className='mb-5 h1 signup-title'>Sign Up</p>
					<Col>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="formName">
								<Form.Control type="text" placeholder="Enter Name" ref={name}/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="for">
								<Form.Control type="tel" placeholder="Enter Mobile" ref={mobile}/>
							</Form.Group>

							<div className="d-grid gap-2">
								<Button className='mt-4' variant="primary" type="submit">
									Get OTP
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</div>

		</>
	);

}

export default SignupForm;