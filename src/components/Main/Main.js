import "./Main.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className='main_container'>
			<nav className='navbar'>
				<h1>Dashboard</h1>
				<button className='white_btn' onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<h2 style={{textAlign:"center"}}>Login Successfull!!!</h2>
		</div>
	);
};

export default Main;
