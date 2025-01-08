import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Navigate, Link } from 'react-router-dom';
import "../../styles/form.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormData() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    
    async function sendData(e) {
        e.preventDefault();
        setError('');

        const response = await actions.login(email, password);

        if (!response.success) {
            setError(response.message);
        }
    }

    return (
        <>
            {store.auth === true ? <Navigate to="/login" /> :
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <Form className="form-container" onSubmit={sendData}>
                       
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="futuristic-label">Email</Form.Label>
                            <Form.Control
                                className="futuristic-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="futuristic-label">Contraseña</Form.Label>
                            <Form.Control
                                className="futuristic-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                placeholder="Password"
                            />
                        </Form.Group>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="d-flex justify-content-between">
                            <Button className="custom-button" type="submit">
                                Login
                            </Button>
                            <Link to="/signup">
                                <Button className="custom-button ms-2">Registrarme</Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            }
        </>
    );
}

export default FormData;
