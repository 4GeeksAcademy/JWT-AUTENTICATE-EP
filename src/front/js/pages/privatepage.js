import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";

export const PrivatePage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const checkAuth = async () => {
            await actions.verifyToken();
        };
        checkAuth();
    }, []);

    if (!store.auth) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            <div className="container text-center">
                <div className="row align-items-start mt-5">
                    <div className="col"></div>
                    <div className="col">
                        <h3 className="">
                            Página Privada
                        </h3>
                       
                    </div>
                    <div className="col"></div>
                </div>
            </div>


        </>
    )
}