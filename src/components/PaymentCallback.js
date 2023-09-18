import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import client from "../utils/Client";

export function PaymentCallback() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [bookingStatus, setBookingStatus] = useState(undefined);

    const handlePaymentStatus = (payment) => {
        console.log(payment);
        if(payment.status === 'SUCCESS'){
            navigate(`/booking/${payment?.bookingId}`)
        }
        else{
            setBookingStatus(payment.status);
        }
    };

    const checkBookingStatus = () => {
        client.post(`/payment/recon`)
            .then(response => response.data)
            .then(data => ({
                paymentId: data?.payment_id,
                bookingId: data?.booking_id,
                status: data?.status
            }))
            .then(handlePaymentStatus)
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
                bookingStatus 
                    && bookingStatus !== 'SUCCESS' 
                    && <div><Button onClick={checkBookingStatus}>Recheck Booking Status</Button></div>
            }

            {
                bookingStatus === 'FAILED' 
                    && <div><Button onClick={handleRetryBook}>Retry Booking</Button></div>
            }
        </>
    );
}

export default PaymentCallback;