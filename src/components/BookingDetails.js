import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { client } from '../utils/Client';
import './styles/BookingDetails.css';

export function BookingDetails() {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState({});
    const navigate = useNavigate();
    const CONFIRMED = "confirmed";
    const FAILED = "failed";
    const PENDING = "pending";

    const getStatusColor = (status) => {
		switch(status?.toLowerCase()) {
			case CONFIRMED: return 'text-success';
			case FAILED: return 'text-danger';
			case PENDING: return 'text-warning';
			default: return null;
		}
	};

    const getStatusAction = () => {
        switch(booking?.status?.toLowerCase()) {
			case CONFIRMED: return confirmedStatusAction;
			case FAILED: return failedStatusAction;
			case PENDING: return pendingStatusAction;
			default: return null;
		}
    }

    const handleRetryBooking = () => {
        navigate(`/book/${bookingId}/confirm`)
    };

    const handleBookAnother = () => {
        navigate(`/`)
    };

    const failedStatusAction = (
        <Col>
            <Button className="py-2" onClick={handleBookAnother}>Book Another</Button>
        </Col>
    );

    const pendingStatusAction = (
        <Col>
            <Button className="px-4 py-2" onClick={handleRetryBooking}>Retry</Button>
        </Col>
    );

    const confirmedStatusAction = (
        <Col xs={7} className="text-center">
            <Card className="c-bg-yellow-stripes">
                <Card.Body>
                    <Card.Title>{booking?.otp}</Card.Title>
                </Card.Body>
            </Card>
            <div className="c-text-small text-secondary mt-1">
                Share this otp with the stylist at the Salon
            </div>
        </Col>    
    );

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
    }, []);

    return (
        <>
            <Container className='c-container'>
				<Row className="justify-content-md-center">
                    <Col xs={12} md={7} className="p-3 mx-md-3 my-2 c-white-container">
                        <div className="c-text-title">Booking Details</div>
                        <Container>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-secondary">Booking Id</div>
                                    {booking?.id}
                                </Col>
                                <Col xs="4">
                                    <div className="c-text-small-title text-secondary">Status</div>
                                    <div className={`${getStatusColor(booking?.status)}`}>{booking?.status}</div>
                                </Col>
                            </Row>
                            <Row className="my-4">
                                <Col auto="true"/>
                                { getStatusAction() }
                                <Col auto="true"/>
                            </Row>    
                        </Container>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={12} md={7} className="p-3 mx-md-3 my-2 c-white-container">
                        <div className="c-text-title">Service Details</div>
                        <Container>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-secondary">Salon</div>
                                    {booking?.salon?.name}
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-secondary">Stylist</div>
                                    {booking?.stylist?.name}
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-secondary">Slot</div>
                                    <Moment format="LLL (dddd)" >{booking?.startTime}</Moment>
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Col>
                                    <div className="c-text-small-title text-secondary">Services</div>
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