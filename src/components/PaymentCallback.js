import { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export function PaymentCallback() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [bookingStatus, setBookingStatus] = useState(undefined);
    const client = axios.create({
        baseURL: apiBaseUrl()
    });

    const checkBookingStatus = () => {
        const orderId = searchParams.get('orderId');
        client.get(`/order/${orderId}`)
        .then( response => response.data )
        .then( data => {
            setBookingStatus(data.status);
        } )
        .catch( errors => console.error(errors));
    }

    const handleRetryBook = () => {
        navigate('/');
    }

    useEffect(() => {
        checkBookingStatus();
    }, []);

    return (
        <>
            {
                bookingStatus ? <h2>Booking Status: {bookingStatus}</h2> : <div>Checking Booking Status...</div>
            }

            {
                bookingStatus && bookingStatus !== 'SUCCESS' && <Button onClick={checkBookingStatus}>Recheck Booking Status</Button>
            }

            {
                bookingStatus === 'FAILED' && <Button onClick={handleRetryBook}>Retry Booking</Button>
            }
        </>
    );
}

export default PaymentCallback;