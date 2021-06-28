import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRef, useState } from 'react';
import { firebaseAuth } from "../firebaseConfig";
import { Link } from "react-router-dom";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();
    let [error, setError] = useState("");

    const formSubmitHandler = () => {
        firebaseAuth
          .createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
          .then((userCredential) => {
            let user = userCredential.user;
            console.log(user);
            window.location = '/add-user-name';
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            setError(`${errorCode}: ${errorMessage}`);
          });
    };
    return (
        <div >
            <form className="signup-container">
            <TextField inputRef={emailRef} id="outlined-basic" label="Email" variant="outlined" />
            <TextField inputRef={passwordRef} id="outlined-basic" label="Password" variant="outlined" />
                <TextField inputRef={confirmPassRef} id="outlined-basic" label="Confirm Password" variant="outlined" />
                <div className="button-groups">
                <Button onClick={formSubmitHandler} variant="contained" color="primary">Signup</Button>
                <Link className="remove-textdeco" to="/login"> <Button variant="contained" color="primary">Login</Button> </Link>
                </div>
               
                {error.length > 0 && <div style={{color: 'red'}}>{error}</div>}
            </form>
        </div>
    )
}