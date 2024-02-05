import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setError] = useState();
    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token) //save token inside localStorage, will automatically be redirected towards dashboard
            }).catch(error => {
            const response = error.response
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setError(response.data.errors)
                } else {
                    console.log(response)
                    setError({
                    email: [response.data.message],
                    });
                }
            }
        })
    }

    return <>
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Login to your account</h1>
                    {
                        errors && <div className="alert">
                            {
                                Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))
                            }
                        </div>
                    }
                    <input ref={emailRef} placeholder="Email" type="email"/>
                    <input ref={passwordRef} placeholder="Password" type="password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered? <Link to='/signup'>Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
}
