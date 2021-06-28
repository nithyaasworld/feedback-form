import { databaseRef } from "../firebaseConfig";

export default function FeedbackCard({ id, feedback, userName }) {
    const deleteHandler = async () => {
    console.log("id is: ", id);
    console.log("userName is: ", userName);
      await databaseRef
          .collection("feedback-app-feedbacks")
          .doc(userName)
          .collection("feedbacks")
          .doc(id).delete().then(() => console.log(`Record has been removed from DB successfully`))
          .catch((e) => console.error(e.message));
  };
  return (
    <div className="feedback-card-container">
      <p>{feedback}</p>
      <div onClick={deleteHandler} className="delete-feedback">
        X
      </div>
    </div>
  );
}