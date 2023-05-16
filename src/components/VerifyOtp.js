import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './styles/VerifyOtp.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function VerifyOtp() {
	const number1 = useRef(null);
	const number2 = useRef(null);
	const number3 = useRef(null);
	const number4 = useRef(null);
	const navigate = useNavigate();

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

	const handleSuccess = () => {
		navigate('/search');
	};

	const handleSubmit = () => {
		const enteredOtp = number1.current.value + number2.current.value + number3.current.value + number4.current.value;
		console.log(enteredOtp);

		handleSuccess();
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

		if (value.length == 0) {
			prevRef?.current?.focus();
		}
		else if (value.length == 1) {
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
			<Container className='holder d-flex justify-content-center align-items-center'>
				<div className='otp-container'>
					<p className='mb-5 h1'>Verify OTP</p>
					<Row className='justify-content-center'>
						<Col className='otp-number' id='number1'>
							<Form.Group className="" controlId="form.number1">
								<Form.Control type="number" placeholder="0" onChange={handleChange} ref={number1} />
							</Form.Group>
						</Col>
						<Col className='otp-number' id='number2'>
							<Form.Group className="" controlId="form.number2">
								<Form.Control type="number" placeholder="0" onChange={handleChange} ref={number2} />
							</Form.Group>
						</Col>
						<Col className='otp-number' id='number3'>
							<Form.Group className="" controlId="form.number3">
								<Form.Control type="number" placeholder="0" onChange={handleChange} ref={number3} />
							</Form.Group>
						</Col>
						<Col className='otp-number' id='number4'>
							<Form.Group className="" controlId="form.number4">
								<Form.Control type="number" placeholder="0"
									onChange={handleChange} ref={number4}
									onKeyUp={handleKeyUp} />
							</Form.Group>
						</Col>
					</Row>
					<div className="d-grid gap-2">
						<Button className='mt-5' variant="primary" type="submit" onClick={handleSubmit}>
							Verify
						</Button>
					</div>
				</div>
			</Container>
		</>
	);
}

export default VerifyOtp;