import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css"

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://password-reset-auth.herokuapp.com/auth";
			//const url = "http://localhost:8080/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className='login_container'>
			<div className='login_form_container'>
				<div className='left'>
					<form className='form_container' onSubmit={handleSubmit}>
						<h1 className="left-h1">Login to Your Account</h1>
						<input
							type="email"
							placeholder="Enter your Email Id"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className='input'
						/>
						<input
							type="password"
							placeholder="Enter your Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className='input'
						/>
						<Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
						{error && <div className='error_msg'>{error}</div>}
						<button type="submit" className='green_btn'>
							Login
						</button>
					</form>
				</div>
				<div className='right'>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className='white_btn'>
							Register
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
