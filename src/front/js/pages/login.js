import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            setRedirect(true);
        }, 3000);

        return () => clearTimeout(redirectTimeout);
    }, []);

    return (
        <>
            {redirect ? <Navigate to="/privatepage" /> : null}
            <div className="container text-center">
                <div className="row align-items-start mt-5">
                    <div className="col">

                    </div>
                    <div className="col-10">
                        <h2 className="display-6">Sesión iniciada</h2>
                        <h3>Iniciando...</h3>
                        <br></br>
                        <div className="spinner" style={{marginLeft:"33rem" , marginTop:"30px"}}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>
        </>
    );
};
