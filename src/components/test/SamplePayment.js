import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export function SamplePayment() {
    const [searchParams] = useSearchParams();
    const handleClick = () => {
        const orderId = searchParams.get('orderId');
        window.location = `/payment/callback?orderId=${orderId}`;
    };

    return (
        <>
            <h2>Sample Payment Page</h2>
            <Button onClick={handleClick}>Redirect to callback</Button>
        </>
    );
}

export default SamplePayment;