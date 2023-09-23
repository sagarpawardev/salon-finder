import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import client from '../utils/Client';

export function BookingConfirm() {
    const navigate = useNavigate();
    const { bookingId } = useParams();

 
    const [ bookingDetails, setBookingDetails ] = useState( {} );

    const handlePayNow = () => {
        client.post('/payment/init')
            .then(response => response.data)
            .then(data => ({
                paymentUrl: data?.redirect_url
            }))
            .then(data => navigate(data?.paymentUrl))
            .catch(errors => console.error(errors));
    };

    useEffect(() => {
        client.get(`/booking/${bookingId}/checkout`)
            .then(response => response.data)
            .then( (response) => ({
                    price: response?.price_info?.totalAmount,
                    convenienceFee: response?.price_info?.convenienceFee,
                    discount: response?.price_info?.discount,
                    totalAmount: response?.price_info?.amountToPay,
                    services: response?.services?.map( service => ({
                        name: service
                    })),
                    stylist: {
                        name: response?.stylist,
                    },
                    salon: {
                        name: response?.salon,
                    },
                    startTime: response?.start_time,
                }) 
            )
            .then(setBookingDetails);
    }, [bookingId]);

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
                                    {bookingDetails?.salon?.name}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="c-text-small-title text-muted mt-2">Stylist</div>
                                    {bookingDetails?.stylist?.name}
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
                                    {bookingDetails?.services?.map( (service, index) => (
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

export default BookingConfirm;