import { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function BookingStatus() {
    const [searchParams] = useSearchParams();
    const [bookingStatus, setBookingStatus] = useState(undefined);

    const client = axios.create({
        baseURL: apiBaseUrl()
    });

    useEffect(() => {
        const orderId = searchParams.get('orderId');
        client.get(`/order/${orderId}`)
        .then( response => response.data )
        .then( data => {
            setBookingStatus(data.status);
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
                bookingStatus ? <h2>Booking Status: {bookingStatus}</h2> : <div>Checking Booking Status...</div>
            }
        </>
    );
}

export default BookingStatus;