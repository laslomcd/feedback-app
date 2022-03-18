import React from 'react'
import { useState, useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)
    const { addFeedback, feedbackEdit } = useContext(FeedbackContext)

    useEffect(() => {
        if (feedbackEdit.edit) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit]);

    const handleTextChange = (e) => {
        if (text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 8) {
            setBtnDisabled(true)
            setMessage('Please enter at least 10 characters')
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 8) {
            const newFeedback = {
                text,
                rating
            }
            addFeedback(newFeedback)
            setText('')
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating) }/>
                <div className="input-group">
                    <input onChange={handleTextChange} type="text" placeholder='Write a review' value={text} />
                    <Button type='submit' isDisabled={btnDisabled}>Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
