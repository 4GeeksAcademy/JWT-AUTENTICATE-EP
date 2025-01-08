import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(Context);
    const [first_Name, setFirst_Name] = useState('');
    const [last_Name, setLast_Name] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async () => {
        const response = await actions.signup(email, password, first_Name, last_Name);
        if (response.success) {
            setRedirectToHome(true);
        } else {
            setErrorMessage(response.message);
        }
    };

    if (redirectToHome) {
        return <Navigate to="/signupok" replace />;
    }

    return (
        <div className="container text-center">
            <h2 className="m-3">Registro</h2>
            <br />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form>
                <div className="mb-3">
                    <label htmlFor="first_Name" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="form-control"
                        id="first_Name"
                        value={first_Name}
                        onChange={(e) => setFirst_Name(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_Name" className="form-label">Apellidos:</label>
                    <input
                        type="text"
                        placeholder="Apellidos"
                        className="form-control"
                        id="last_Name"
                        value={last_Name}
                        onChange={(e) => setLast_Name(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSignup}>
                    Registrarme
                </button>
                <Link to="/">
                    <button type="button" className="btn btn-primary" style={{ margin: "5px" }}>
                        Volver a Inicio
                    </button>
                </Link>
            </form>
        </div>
    );
};

export default Signup;

