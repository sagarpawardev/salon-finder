import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function NoPage() {
    const navigate = useNavigate();
	return (
		<>
			<div>Cannot find the page you are looking for...</div>
            <Button onClick={() => navigate(-1)}>Go back</Button>
		</>
	);
}

export default NoPage;
