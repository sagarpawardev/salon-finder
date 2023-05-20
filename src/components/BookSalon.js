import { useContext, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../App";
import axios from "axios";
import { apiBaseUrl } from "../utils";

export function BookSalon() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const client = axios.create({
        baseURL: apiBaseUrl()
    });

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
            client.post('/order')
                .then(
                    response => response.data
                )
                .then(
                    data => {
                        window.location = data.paymentLink
                    }
                )
                .catch(errors => {
                    alert('unable to fetch payment link');
                    console.error(errors);
                    console.error(errors.message);
                }
                )
        }
    });

    return (
        <>
            Booking...
        </>
    );
}

export default BookSalon;