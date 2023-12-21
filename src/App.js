import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import PostExample from "./pages/PostExample";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
	const [feedback, setFeedback] = useState(FeedbackData);

	const deleteFeedback = (id) => {
		if (window.confirm("Are you sure you want to delete?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		console.log(newFeedback);
		setFeedback([newFeedback, ...feedback]);
	};

	return (
		<FeedbackProvider>
			<Router>
				<>
					<Header />
					<div className="container">
						<Routes>
							<Route
								path="/"
								element={
									<>
										<FeedbackForm handleAdd={addFeedback} />
										<FeedbackStats />
										<FeedbackList handleDelete={deleteFeedback} />
									</>
								}
							></Route>

							<Route path="/about" element={<AboutPage />} />
							<Route path="/post/*" element={<PostExample />} />
						</Routes>
						<AboutIconLink />
					</div>
				</>
			</Router>
		</FeedbackProvider>
	);
}

export default App;
