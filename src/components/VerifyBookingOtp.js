import { useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { createSearchParams, useNavigate } from 'react-router-dom';

import styles from './styles/VerifyOtp.module.scss';
import client from '../utils/Client';
import { AuthContext } from '../App';
import { Card, Container } from 'react-bootstrap';

export function VerifyBookingOtp() {
	const number1 = useRef(null);
	const number2 = useRef(null);
	const number3 = useRef(null);
	const number4 = useRef(null);

	const navigate = useNavigate();

	const { auth, setAuth } = useContext(AuthContext);

	const { bookingId } = useParams();

	const otpMap = {
		'form.number1': {
			ref: number1,
			next: number2,
		},
		'form.number2': {
			prev: number1,
			ref: number2,
			next: number3,
		},
		'form.number3': {
			prev: number2,
			ref: number3,
			next: number4,
		},
		'form.number4': {
			prev: number3,
			ref: number4,
		},
	};

	const handleSubmit = () => {
		const enteredOtp = number1.current.value + number2.current.value + number3.current.value + number4.current.value;

		client.post("/booking/verify", {
			"otp": enteredOtp,
			booking_id: bookingId
		})
		.then(response => {
			setAuth({...auth, user: auth.user});
			navigate(`/partner`)
		})
		.catch(errors => console.error(errors));
	};

	const handleKeyUp = (event) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}

	const handleChange = (event) => {
		const id = event.currentTarget.id;
		const value = event.currentTarget.value;

		const currRef = otpMap[id]?.ref;
		const prevRef = otpMap[id]?.prev;
		const nextRef = otpMap[id]?.next;

		if (value.length === 0) {
			prevRef?.current?.focus();
		}
		else if (value.length === 1) {
			nextRef?.current?.focus();
		}
		else if (value.length > 1) {
			if (currRef?.current) {
				currRef.current.value = value.at(-1);
			}
			nextRef?.current?.focus();
		}
	}

	return (
		<>
				<Container className={`px-4 py-3 ${styles.parentContainer}`}>
					<div className={styles.loginContainer}>
						<Card className={`${styles.loginSubContainer} justify-content-center`}>
							<p className={`mb-5 h1 text-center ${styles.signinTitle}`}>Verify OTP</p>
							<Form>
								<Row className='justify-content-center'>
									<Col className='otp-number' id='number1'>
										<Form.Group className="" controlId="form.number1">
											<Form.Control className='text-center' type="number" placeholder="0" onChange={handleChange} ref={number1} />
										</Form.Group>
									</Col>
									<Col className='otp-number' id='number2'>
										<Form.Group className="" controlId="form.number2">
											<Form.Control className='text-center' type="number" placeholder="0" onChange={handleChange} ref={number2} />
										</Form.Group>
									</Col>
									<Col className='otp-number' id='number3'>
										<Form.Group className="" controlId="form.number3">
											<Form.Control className='text-center' type="number" placeholder="0" onChange={handleChange} ref={number3} />
										</Form.Group>
									</Col>
									<Col className='otp-number' id='number4'>
										<Form.Group className="" controlId="form.number4">
											<Form.Control className='text-center' type="number" placeholder="0"
												onChange={handleChange} ref={number4}
												onKeyUp={handleKeyUp} />
										</Form.Group>
									</Col>
								</Row>
								<div className="d-grid gap-2">
									<Button className='mt-5' variant="primary" type="button" onClick={handleSubmit}>
										Verify
									</Button>
								</div>
							</Form>
						</Card>
					</div>
				</Container>
			</>
	);
}

export default VerifyBookingOtp;