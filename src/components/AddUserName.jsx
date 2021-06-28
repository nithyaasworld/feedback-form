import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useRef, useState } from 'react';
import { databaseRef, firebaseAuth } from '../firebaseConfig';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function AddUserName() {
    const history = useHistory();
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
        console.log("uid is: ", uid);
        await databaseRef.collection("feedback-app-usernames").get()
            .then((snapshot) => {
                let filteredResult = snapshot.docs.filter((doc) => doc.data().uid === uid);
                if (filteredResult[0].data().username) {
                    console.log("username details:", filteredResult[0].data());
                    setUserPresent(true);
                    setUserName(filteredResult[0].data().username);
                } else {
                    console.error("No such document!");
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
              history.push('/');
            //   <Redirect to="/" />
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
            history.push(`/profile/${userName}`);
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