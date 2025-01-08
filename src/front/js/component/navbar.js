import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleLogout = () => {
		actions.logout();
		setOpen(false);
		navigate("/logoutok");
	};

	const toggleMenu = () => {
		setOpen(prevState => !prevState);
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container d-flex justify-content-between align-items-center">

					<Link to="/" className="navbar-brand">
						<h1 className="text-light">AUTENTICATE JWT</h1>
					</Link>


					{store.auth === true && (
						<button
							onClick={toggleMenu}
							className="btn btn-light"
						>
							Menu
						</button>
					)}
				</div>
			</nav>

			{/* Menú desplegable */}
			<div className={`menu ${open ? "open" : "closed"}`}>
				{open && (
					<>
						<button
							aria-label="Close"
							className="close-button"
							onClick={toggleMenu}
						>
							&times;
						</button>
						<div className="menu-container">
							<Link to="/" className="menu-item">Inicio</Link>
							<Link to="/contact" className="menu-item">Página 1</Link>
							<Link to="/services" className="menu-item">Página 2</Link>

							<button onClick={handleLogout} className="menu-item btn custom-logout-button">Salir</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};
