const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			logout: () => {
				console.log('logout desde flux')
				sessionStorage.removeItem("token");
				setStore({ auth: false })
			},
			handleLogout: () => {
				console.log('logout desde flux')
				sessionStorage.removeItem("token");
				setStore({ auth: false })
			},
			login: async (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions);

					if (response.status !== 200) {
						const errorData = await response.json();
						return { success: false, message: errorData.msg || "Usuario o contraseña incorrecta" };
					}
					const data = await response.json();
					localStorage.setItem("token", data.access_token);
					setStore({ auth: true });

					return { success: true };

				} catch (error) {
					console.error('Error during login:', error);
					return { success: false, message: "Error conectando al servidor" };
				}
			},

			logout: () => {
				setStore({ auth: false });
				localStorage.removeItem("token");
			},

			signup: async (email, password, first_Name, last_Name) => {
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password, first_Name, last_Name })
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions);

					if (response.status !== 200) {
						const errorData = await response.json();
						return { success: false, message: errorData.msg || "Error de registro" };
					}

					const data = await response.json();
					console.log("Registro exitoso:", data.msg);
					return { success: true };

				} catch (error) {
					console.error("Error de signup:", error);
					return { success: false, message: "Error conectando al servidor" };
				}
			},
			verifyToken: async () => {
				const token = localStorage.getItem("token");

				if (!token) {
					setStore({ auth: false });
					return false;
				}

				const requestOptions = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/privatepage", requestOptions);

					if (response.status === 200) {
						setStore({ auth: true });
						return true;
					} else {
						localStorage.removeItem("token");
						setStore({ auth: false });
						return false;
					}
				} catch (error) {
					console.error('Error verifying token:', error);
					setStore({ auth: false });
					return false;
				}
			},


			getMessage: async () => {
				try {

					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })

					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {

				const store = getStore();


				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});


				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
