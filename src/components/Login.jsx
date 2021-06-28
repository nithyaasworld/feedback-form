import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRef, useState } from "react";
import { firebaseAuth } from "../firebaseConfig";

export default function Login() {
    let emailRef = useRef();
    let passwordRef = useRef();
    let [error, setError] = useState("");
    const formSubmitHandler = () => {
        setError("");
        firebaseAuth
          .signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            window.location = '/add-user-name';
            console.log("set window location");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            setError(`${errorCode}: ${errorMessage}`);
          });
    }
    return (
        <div className="login-wrapper">
             <form className="login-container">
                <TextField inputRef={emailRef} id="outlined-basic" label="Email" variant="outlined" />
                <TextField inputRef={passwordRef} id="outlined-basic" label="Password" variant="outlined" />
                <div className="button-groups">
                <Button onClick={formSubmitHandler} variant="contained" color="primary">Login</Button>
                <Link to="/"> <Button variant="contained" color="primary">New User? Signup here! </Button> </Link>
                </div>
               
                {error.length > 0 && <div style={{color: 'red'}}>{error}</div>}
            </form>
        </div>
    )
}