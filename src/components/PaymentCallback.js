import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import client from "../utils/Client";

export function PaymentCallback() {
    const navigate = useNavigate();

    const [bookingStatus, setBookingStatus] = useState(undefined);

    const handlePaymentStatus = useCallback((payment) => {
        if(payment.status === 'SUCCESS'){
            navigate(`/booking/${payment?.bookingId}`)
        }
        else{
            setBookingStatus(payment.status);
        }
    }, [navigate]);

    const checkBookingStatus = useCallback(() => {
        client.post(`/payment/recon`)
            .then(response => response.data)
            .then(data => ({
                paymentId: data?.payment_id,
                bookingId: data?.booking_id,
                status: data?.status
            }))
            .then(handlePaymentStatus)
            .catch( errors => console.error(errors));
    }, [handlePaymentStatus])

    const handleRetryBook = () => {
        navigate('/');
    }

    useEffect(() => {
        checkBookingStatus();
    }, [checkBookingStatus]);

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