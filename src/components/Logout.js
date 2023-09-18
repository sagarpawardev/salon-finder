import { useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import client from "../utils/Client";

export function Logout() {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    client.delete("/auth")
        .then(setAuth(undefined))
        .then(navigate("/"))
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
