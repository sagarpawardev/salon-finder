import { useContext } from "react";
import axios from "axios";
import { apiBaseUrl } from '../utils';
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

export function Logout() {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

	const client = axios.create({
		baseURL:  apiBaseUrl()
	});

    client.delete("/auth").then(
        () => {
            setAuth(undefined);
            navigate("/");
        }
    )
    .catch(errors => {
        console.error(errors);
    });

	return (
		<>
			<div>Logging out...</div>
		</>
	);
}

export default Logout;
