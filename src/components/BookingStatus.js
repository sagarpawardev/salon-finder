import { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export function BookingStatus() {
    const { appointmentId } = useParams();
    const [bookingStatus, setBookingStatus] = useState(undefined);
    const navigate = useNavigate();

    const client = axios.create({
        baseURL: apiBaseUrl()
    });

    const loadingView = () => {
        return (
            <div>Checking Booking Status...</div>
        );
    };

    const bookingStatusView = () => {
        return (
            <div>
                <h2>Booking Status: {bookingStatus}</h2>
                <Button onClick={() => navigate('/')}>Home</Button>
            </div>
        );
    };

    useEffect(() => {
        //const orderId = urlParams.get('appointmentId');
        client.get(`/order/${appointmentId}`)
        .then( response => response.data )
        .then( data => {
            setBookingStatus(data.status);
            setBookingStatus(JSON.stringify(data));
            // if(data.status === 'SUCCESS'){
            //     console.log('Appointment Booked');
            // }
            // else {
            //     console.log('Appointment not booked yet. Current status: ', data.status);
            // }
        } )
        .catch( errors => console.error(errors));
    });

    return (
        <>
            {
                bookingStatus ? bookingStatusView() : loadingView()
            }
        </>
    );
}

export default BookingStatus;