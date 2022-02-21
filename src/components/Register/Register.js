import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css"

const Register = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://password-reset-auth.herokuapp.com/users";
			//const url = "http://localhost:8080/users";
			
			const { data: res } = await axios.post(url, data);	
			setMsg(res.message);				
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {			
				setError(error.response.data.message)
			}
		}
	};

	return (
		<div className='signup_container'>
			<div className='signup_form_container'>
				<div className='right'>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className='white_btn'>
							Login
						</button>
					</Link>
				</div>
				<div className='left'>
					<form className='form_container' onSubmit={handleSubmit}>
						<h1 className="left-h1">Create Account</h1>
						<input
							type="text"
							placeholder="Enter your First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className='input'
						/>
						<input
							type="text"
							placeholder="Enter your Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className='input'
						/>
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
						{error && <div id="hideDiv" className='error_msg'>{error}</div>}
						{msg && <div className='success_msg'>{msg}</div>}
						<button type="submit" className='green_btn'>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
