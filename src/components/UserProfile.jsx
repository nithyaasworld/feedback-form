import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { databaseRef } from "../firebaseConfig";
import FeedbackCard from "./FeedbackCard";

export default function UserProfile() {
  let { userName } = useParams();
  let [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const doc = databaseRef
      .collection("feedback-app-feedbacks")
      .doc(userName)
      .collection("feedbacks");
    doc.onSnapshot(
      (docSnapshot) => {
        let feedbacks = docSnapshot.docs.map((doc) => doc.data().feedback);
        setFeedbackList(feedbacks);
      },
      (err) => {
        console.error(`Encountered error: ${err}`);
      }
    );
  }, []);

  useEffect(() => {
    console.log(feedbackList);
  }, [feedbackList]);

  return (
    <div className="user-profile-container">
      <h1>{userName} Profile</h1>
      <p className="share-this-feedback-link">
        Share this feedback link to get feedback:{" "}
        <Link to={`/feedback/${userName}`}>
          http://localhost:3000/feedback/{userName}
        </Link>
      </p>
      <div className="feedback-display-area">
        {feedbackList.length > 0 ? (
                  feedbackList.map(feedback => <FeedbackCard key={feedback} feedback={feedback} userName={userName} />)
        ) : (
          <div>No feedback received yet</div>
        )}
      </div>
    </div>
  );
}
