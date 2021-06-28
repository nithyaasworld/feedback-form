import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRef, useState } from "react";
import { databaseRef } from '../firebaseConfig';


export default function FeedbackForm() {
  let { userName } = useParams();
  console.log(userName);
    let yourFeedback = useRef();
    let [error, setError] = useState("");
  const formSubmitHandler = async () => {
      console.log("entered feedback is: ", yourFeedback.current.value);
      await databaseRef.collection("feedback-app-feedbacks").doc(userName).collection('feedbacks').add({feedback:  yourFeedback.current.value })
          .then(data => {
              console.log("feedback recorded, ", data);
              setError("");
              yourFeedback.current.value = "";
          })
          .catch(e => {
              console.error(e.message);
              setError(e.message);
          });
  };

  return (
    <div className="feedback-form-container">
      <h1>Provide your feedback for the user: {userName}</h1>
      <form className="feedback-form-controls">
        <TextField
          inputRef={yourFeedback}
          multiline
          rows={4}
          rowsMax={8}
          id="outlined-basic"
          label="Your Feedback"
          variant="outlined"
        />
        <Button
          className="feedback-form-submit-btn"
          onClick={formSubmitHandler}
          variant="contained"
          color="primary"
        >
          Submit
              </Button>
              {error.length > 0 && <div style={{color: 'red'}}>{error}</div>}
      </form>
    </div>
  );
}
