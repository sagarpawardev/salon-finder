import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles/SignupForm.css';
import VerifyOtp from './VerifyOtp';
import { useState } from 'react';

export function SignupForm() {
	const [verify, setVerify] = useState(false);

	const handleClick = () => {
		setVerify(true);
	};

	if(!verify){
		return (
			<>
				<div className='signup-center-container'>
					<Row className="justify-content-md-center">
						<p className='mb-5 h1'>Sign Up</p>
						<Col>
							<Form>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Control type="text" placeholder="Enter Name" />
								</Form.Group>

								<Form.Group className="mb-3" controlId="for">
									<Form.Control type="tel" placeholder="Enter Mobile" />
								</Form.Group>

								<div className="d-grid gap-2">
									<Button className='mt-4' variant="primary" type="submit" onClick={handleClick}>
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
	else {
		return (
			<VerifyOtp></VerifyOtp>
		);
	}
}

export default SignupForm;