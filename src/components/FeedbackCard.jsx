export default function FeedbackCard({ feedback }) {
    return (
        <div className="feedback-card-container">
            <p>{feedback}</p>
            <div className="delete-feedback">X</div>
        </div>
    )
}