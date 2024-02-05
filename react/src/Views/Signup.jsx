import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setError] = useState();

    const {setUser, setToken} = useStateContext();

    function onSubmit(e) {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload)

        axiosClient.post('/signup', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token) //save token inside localStorage, will automatically be redirected towards dashboard
        }).catch(error => {
            const response = error.response
            if (response && response.status === 422) {
                setError(response.data.errors)
            }
        })
    }

    return <>
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Sign in for free</h1>
                    {
                        errors && <div className="alert">
                            {
                                Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))
                            }
                        </div>
                    }
                    <input ref={nameRef} placeholder="Full Name" type="text"/>
                    <input ref={emailRef} placeholder="Email" type="email"/>
                    <input ref={passwordRef} placeholder="Password" type="password"/>
                    <input ref={passwordConfirmationRef} placeholder="Password Confirmation" type="password"/>
                    <button className="btn btn-block">Create account</button>
                    <p className="message">
                        Already registered? <Link to='/login'>Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
}

