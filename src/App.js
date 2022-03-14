import { useState } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutIconLink from "./components/AboutIconLink";

function App() {
	const [feedback, setFeedback] = useState(FeedbackData);

	const deleteFeedback = (id) => {
		if (window.confirm("Are you sure you want to delete this feedback?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	}

	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback,...feedback]);
	}
	return (
		<Router>
			<Header />
			<div className="container">
				<Routes>
					<Route exact path="/" element={
						<>
							<FeedbackStats feedback={feedback} />
						    <FeedbackForm handleAdd={addFeedback}/>
						    <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
						</>
					}>
					</Route>
					<Route path="/about" element={<AboutPage/>} />
				</Routes>	

			<AboutIconLink />	
			</div>
		</Router>
	);
}

export default App;
