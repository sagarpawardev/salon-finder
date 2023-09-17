import { useContext, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../App";
import axios from "axios";
import { apiBaseUrl } from "../utils";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import './styles/BookSalon.css';
import Moment from "react-moment";

export function BookSalon() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const mockBookingDetails = {
        "price_info": {
          "convenienceFee": 30,
          "totalAmount": 270,
          "discount": 10,
          "amountToPay": 290
        },
        "services": [
          "HAIR_CUT",
          "FACE_MASSAGE"
        ],
        "stylist": "Karan Johar",
        "salon": "Sample Salon",
        "start_time": "2023-09-12 21:04:58"
    };
    const mapResponse = (response) => ({
        price: response.price_info.totalAmount,
        convenienceFee: response.price_info.convenienceFee,
        discount: response.price_info.discount,
        totalAmount: response.price_info.amountToPay,
        services: response.services.map( service => ({
            name: service
        })),
        stylist: {
            name: response.stylist,
        },
        salon: {
            name: response.salon,
        },
        startTime: response.start_time,
    });
    const [ bookingDetails, setBookingDetails ] = useState( mapResponse(mockBookingDetails) );
    const client = axios.create({
        baseURL: apiBaseUrl()
    });

    const handlePayNow = () => {
        navigate('/test/paymentLink');
    };

    

    useEffect(() => {
        if (!auth) {
            const params = { ref: location.pathname };
            searchParams.forEach((value, key) => {
                params[key] = value;
            });

            navigate({
                pathname: '/signin',
                search: `?${createSearchParams(params)}`,
            });
        }
        else {
            // client.post('/order')
            //     .then(
            //         response => response.data
            //     ).then(
            //         data => {
            //             window.location = data.paymentLink
            //         }
            //     ).catch(errors => {
            //         alert('unable to fetch payment link');
            //         console.error(errors);
            //         console.error(errors.message);
            //     });
            

            //setBookingDetails( mapResponse(mockBookingDetails) );
        }
    });

    return (
        <>
			<Container className='c-container'>
				<Row>
                    <Col xs={12} md={7} className="p-3 mx-md-3 my-2 c-white-container">
                        <div className="c-text-title">Booking Details</div>
                        <Container>
                            <Row>
                                <Col>
                                    <div className="c-text-small-title text-muted mt-2">Salon</div>
                                    {bookingDetails.salon.name}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="c-text-small-title text-muted mt-2">Stylist</div>
                                    {bookingDetails.stylist.name}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="c-text-small-title text-muted mt-2">Slot</div>
                                    <Moment format="LLL (dddd)" >{bookingDetails.startTime}</Moment>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="c-text-small-title text-muted mt-2">Services</div>
                                    {bookingDetails.services.map( (service, index) => (
                                        <div key={index} className="text-success c-text-small"> 
                                            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#28a745",}} /> {service.name}
                                        </div>
                                    ))}
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                    <Col xs={12} md={4} className="p-3 mx-md-3 my-2 c-white-container">
                        <div className="c-text-title">Price Details</div>
                        <Container>
                            <Row>
                                <Col>
                                    Price
                                </Col>
                                <Col className="text-end">
                                    &#8377; {bookingDetails?.price}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Convenience Fee
                                </Col>
                                <Col className="text-end">
                                    &#8377; {bookingDetails?.convenienceFee}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Discount
                                </Col>
                                <Col className="text-end">
                                    &#8377; {bookingDetails?.discount}
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="c-text-bold">
                                <Col>
                                    Total Amount
                                </Col>
                                <Col className="text-end">
                                    &#8377; {bookingDetails?.totalAmount}
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col ></Col>
                                <Col xs="auto">
                                    <Button className="px-4 py-2" onClick={handlePayNow}>Pay Now</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
				</Row>
			</Container>
		</>
    );
}

export default BookSalon;