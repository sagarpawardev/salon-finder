import { useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { createSearchParams, useNavigate } from 'react-router-dom';

import styles from './styles/VerifyOtp.module.scss';
import { AuthContext } from '../App';
import client from '../utils/Client';
import { Card, Container } from 'react-bootstrap';

export function VerifyOtp({email, sendOtpResponse}) {
	const number1 = useRef(null);
	const number2 = useRef(null);
	const number3 = useRef(null);
	const number4 = useRef(null);
	const navigate = useNavigate();

	const { setAuth } = useContext(AuthContext);

	const location = useLocation();
	const pathname = location.pathname;

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

	const handleSuccess = (authData) => {
		setAuth( authData );

		if (pathname.includes('partner')) {
			client.get('/stylist', )
			.then(response => response.data)
			.then(stylist => {
				if(stylist?.name == null || stylist?.phone == null) {
					navigate("/partner/profile")
				} else {
					navigate("/partner")
				}
			});
			navigate('/partner/');
		}
		else {
			
		
		client.get('/user/detailsPreferences', )
			.then(response => response.data)
			.then(userData => {
				setAuth( {...authData, user: {...userData}});
				if(userData?.user?.name == null || userData?.user?.phone == null) {
					navigate('/profile', { state: { email: email } });
				} else if (userData?.city == null || userData?.locality == null) {
					navigate('/preference');
				}
				else{
					navigate({
						pathname: "/search",
						search: createSearchParams({
							locality: userData?.locality
						}).toString()
					});
				}
			})
			.catch(errors => console.error(errors));

		}
	};

	const handleSubmit = () => {
		const enteredOtp = number1.current.value + number2.current.value + number3.current.value + number4.current.value;
		const pathname = location.pathname;
		let otpUsecase = ''
		if (pathname.includes('partner'))
			otpUsecase = 'STYLIST_LOGIN';
		else
			otpUsecase = 'USER_LOGIN';


		client.post("/login", {
			"otp": enteredOtp,
			email: email,
			created_at: sendOtpResponse.created_at,
			use_case: otpUsecase
		})
		.then(request => request.data)
		.then(data => {
			console.log(data.token)
			if(data?.token){
				client.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
				handleSuccess(data);
			}
			else{
				console.error('failed to login');
				console.error(data);
			}
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

export default VerifyOtp;