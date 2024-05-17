import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [feedback, setFeedback] = useState([]);
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	// Fetch Feedback
	const fetchFeedback = async () => {
		const response = await fetch(`http://localhost:5500/feedback?_sort=id`);
		const data = await response.json();

		setFeedback(data);
		setIsLoading(false);
	};

	// Delete Feedback
	const deleteFeedback = (id) => {
		if (window.confirm("Are you sure you want to delete?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback, ...feedback]);
	};

	const updateFeedback = (id, updatedItem) => {
		setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
	};

	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	return (
		<FeedbackContext.Provider
			value={{ feedback, deleteFeedback, addFeedback, editFeedback, feedbackEdit, updateFeedback, isLoading }}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
