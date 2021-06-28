import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useRef, useState } from 'react';
import { databaseRef, firebaseAuth } from '../firebaseConfig';
import { Redirect } from "react-router-dom";

export default function AddUserName() {
    const userNameRef = useRef();
    let [userPresent, setUserPresent] = useState(false);
    let [userName, setUserName] = useState("");
    let [userNameList, setUserNameList] = useState([]);
    let [uid, setUid] = useState("");
    
    
    const formSubmitHandler = async () => {
        console.log("entered username is: ", userNameRef.current.value);
        if (userNameList.includes(userNameRef.current.value)) {
            console.error("user exists already");
        } else {
            let newUserName = { uid: uid, username: userNameRef.current.value };
            await databaseRef.collection("feedback-app-usernames").add(newUserName)
                .then((data) => {
                    console.log("username added to db successfuly");
                    setUserName(userNameRef.current.value);
                }).catch((e) => console.error(e.message));
        }
    }
    const checkUserNamePresent = async (uid) => {
        console.log("check username present fucntion called");
        await databaseRef.collection("feedback-app-usernames").doc(uid).get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setUserPresent(true);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    setUserPresent(false);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                setUserPresent(false);
            });
    }
    
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
          if (user) {
              console.log(user.uid);
              setUid(user.uid);
              checkUserNamePresent(user.uid);
          } else {
            // setIsUserLogged(false);
            //   window.location('/');
              console.error("user is not logged in");
              <Redirect to="/" />
          }
        });
    }, [])
    
    useEffect(() => {
        databaseRef.collection("feedback-app-usernames").get()
            .then((snapshot) => {
                setUserNameList(snapshot.docs.map(doc => doc.data().username));
            }).catch((e) => {
                console.error(e.message);
            })
    }, [])

    useEffect(() => {
        if (userName.length > 0) {
            window.location(`/profile/${userName}`);
        }
    }, [userName])


    return (
        <div className="add-user-name-wrapper">
             <form className="add-user-name-container">
                <TextField inputRef={userNameRef} id="outlined-basic" label="Username" variant="outlined" />
                <Button onClick={formSubmitHandler} variant="contained" color="primary">Add Username</Button>
            </form>
        </div>
    )
}