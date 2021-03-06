import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            rating: 10,
            text: "Feedback Item 1.",
        },
        {
            id: 2,
            rating: 9,
            text: "Feedback Item 2.",
        },
        {
            id: 3,
            rating: 8,
            text: "Feedback Item 3.",
        },
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    const updateFeedback = (id, updatedItem) => {
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        });
    }

    const deleteFeedback = (id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    return <FeedbackContext.Provider
        value={{
            feedback,
            deleteFeedback,
            addFeedback,
            editFeedback,
            feedbackEdit,
            updateFeedback
        }}
    >
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;