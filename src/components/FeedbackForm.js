import React from 'react'
import { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

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
        console.log(text.length)
    }

    return (
        <Card>
            <form>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect />
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
