import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import VerifyOtp from './VerifyOtp';
import styles from './styles/SigninForm.module.scss';
import { Card, Container } from 'react-bootstrap';

export function SigninForm() {
	const [verify, setVerify] = useState(false);

	useEffect(() => {
		document.body.classList.add('imgBg');
		return () => {
			document.body.classList.remove('imgBg');
		};
	}, []);

	const handleClick = () => {
		setVerify(true);
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
									<Form.Control type="tel" placeholder="Enter Mobile" className='text-center'/>
								</Form.Group>

								<div className="d-grid gap-2">
									<Button className='mt-4' variant="primary" type="submit" onClick={handleClick}>
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
				<VerifyOtp></VerifyOtp>
			</>
		);
	}
}

export default SigninForm;