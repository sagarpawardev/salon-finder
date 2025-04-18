import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export function SamplePayment() {
    const [searchParams] = useSearchParams();
    const handleClick = () => {
        const bookingId = searchParams.get('bookingId');
        window.location = `/payment/callback?bookingId=${bookingId}`;
    };

    return (
        <>
            <h2>Sample Payment Page</h2>
            <p>you are supposed to place payment gateway page here and make payment. Once the payment is done you wil be redirected to callback page</p>
            <Button onClick={handleClick}>Click to Redirect</Button>
        </>
    );
}

export default SamplePayment;