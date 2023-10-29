import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VerifyOtp from './VerifyOtp';
import styles from './styles/SigninForm.module.scss';
import { Card, Container } from 'react-bootstrap';
import { client } from '../utils';

export function SigninForm() {
	const [verify, setVerify] = useState(false);
	const [enteredEmail, setEnteredEmail] = useState(null);
	const [sendOtpResponse, setSendOtpResponse] = useState(null);
	let email = '';
	let otpUsecase = null;

	const location = useLocation();
	const pathname = location.pathname;

	useEffect(() => {
		document.body.classList.add('imgBg');
		return () => {
			document.body.classList.remove('imgBg');
		};
	}, []);

	const setEmail = (value) => {
		email = value;
	}

	const handleClick = () => {
		if (pathname.includes('partner'))
			otpUsecase = 'STYLIST_LOGIN';
		else
			otpUsecase = 'USER_LOGIN';

		setEnteredEmail(email)

		client.post("/send_otp", {
			email: email,
			use_case: otpUsecase
		}).then((response) => {
			setSendOtpResponse(response.data);
			setVerify(true);
		}).catch(error => {
			console.log(error)
			// setError(error);
		  });

		
	};

	if(!verify){
		return (
			<>
				<Container className={`px-4 py-3 ${styles.parentContainer}`}>
					<div className={styles.loginContainer}>
						<Card className={`${styles.loginSubContainer} justify-content-center`}>
							<p className={`mb-5 h1 text-center ${styles.signinTitle}`}>Sign In</p>
							<Form>
								<Form.Group className="mb-3" controlId="for">
									<Form.Control type="text" placeholder="Enter e-mail" className='text-center'
									name="email"
									// value={email}
									onChange={e => {
										setEmail(e.target.value);
										// console.log(email);
									}}
									/>
								</Form.Group>

								<div className="d-grid gap-2">
									<Button className='mt-4' variant="primary" type="button" onClick={handleClick}>
										Get OTP
									</Button>
								</div>
							</Form>
						</Card>
					</div>
				</Container>
			</>
		);
	}
	else {
		return (
			<>
				<VerifyOtp email={enteredEmail} sendOtpResponse={sendOtpResponse}></VerifyOtp>
			</>
		);
	}
}

export default SigninForm;