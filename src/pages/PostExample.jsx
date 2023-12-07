import { Navigate, useNavigate, Route, Routes } from "react-router-dom";

function PostExample() {
	const status = 200;
	const navigate = useNavigate();

	const onClick = () => {
		console.log("redirect");
		navigate("/about");
	};

	if (status === 404) {
		return <Navigate to="/notfound" />;
	}
	return (
		<div>
			<h1>Post</h1>
			<button onClick={onClick}>Click</button>
			<Routes>
				<Route path="/show" element={<h1>Post Component Element</h1>} />
			</Routes>
		</div>
	);
}

export default PostExample;
