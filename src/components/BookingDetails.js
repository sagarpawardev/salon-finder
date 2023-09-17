import { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import './styles/BookingDetails.css';

export function BookingDetails() {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState({});

    // const client = axios.create({
    //     baseURL: apiBaseUrl()
    // });
    const client = ({
        get: () => Promise.resolve({
            data: {
                "booking_id": "4535323",
                "status": "Confirmed",
                "otp": "123 232",
                "stylist": "Karan Jogar",
                salon: 'Sample Salon',
                services: [
                    {
                        name: 'Hair Cut',
                    },
                    {
                        name: 'Face Massage',
                    }
                ],
                startTime: '2023-09-12 21:04:58'
            }
        }),
    });

    useEffect(() => {
        client.get(`/booking/${bookingId}`)
            .then( response => response.data )
            .then( data => ({
                ...data,
                id: data.booking_id,
                stylist: {
                    name: data.stylist
                },
                salon: {
                    name: data.salon
                },
            }))
            .then( data => setBooking(data))
            .catch( errors => console.error(errors));
    });

    return (
        <>
            <Container className='c-container'>
				<Row className="justify-content-md-center">
                    <Col xs={12} md={7} className="p-3 mx-md-3 my-2 c-white-container">
                        <div className="c-text-title">Booking Details</div>
                        <Container>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-muted">Booking Id</div>
                                    {booking?.id}
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-muted">Status</div>
                                    {booking?.status}
                                </Col>
                            </Row>
                            { booking?.otp &&
                                <Row className="my-4">
                                    <Col auto/>
                                    <Col xs={7}>
                                        <Card className="text-center c-bg-yellow">
                                            <Card.Body>
                                                <Card.Title>{booking?.otp}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col auto/>
                                </Row>
                            }
                        </Container>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={12} md={7} className="p-3 mx-md-3 my-2 c-white-container">
                        <div className="c-text-title">Service Details</div>
                        <Container>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-muted">Salon</div>
                                    {booking?.salon?.name}
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-muted">Stylist</div>
                                    {booking?.stylist?.name}
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-muted">Slot</div>
                                    <Moment format="LLL (dddd)" >{booking?.startTime}</Moment>
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-muted">Services</div>
                                    {booking?.services?.map( (service, index) => (
                                        <div key={index} className="text-success c-text-small"> 
                                            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#28a745",}} /> {service?.name}
                                        </div>
                                    ))}
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default BookingDetails;