import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function userForm() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    let title = user.id ? "Update User: " + user.name : "Add User";
    let btnTitle = user.id ? "Update" : "Save";
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get('/users/' + id).then(({data}) => {
                setUser(data.data)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }, []);
    }

    function onsubmit(ev) {
        ev.preventDefault()

        if (user.id) { //update user here
            axiosClient.put('/users/' + user.id, user)
                .then(() => {
                    navigate('/users')
                }).catch(error => {
                const response = error.response
                if (response && response.status === 422) {
                    setError(response.data.errors)
                }
            })
        } else { //add user here
            axiosClient.post('/users', user)
                .then(() => {
                    navigate('/users')
                }).catch(error => {
                const response = error.response
                if (response && response.status === 422) {
                    setError(response.data.errors)
                }
            })
        }


    }

    return (
        <>
            {loading && "Please wait..."}
            {!loading && title}
            <div className="card animated fadeInDown">
                {
                    loading && (<div className="text-center">
                        Loading...
                    </div>)
                }
                {
                    errors && <div className="alert">
                        {
                            Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))
                        }
                    </div>
                }
                {
                    !loading && <form onSubmit={onsubmit}>
                        <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})}
                               placeholder="Name"/>
                        <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})}
                               placeholder="Email"/>
                        <input onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
                        <input onChange={ev => setUser({...user, password_confirmation: ev.target.value})}
                               placeholder="Password confirmation"/>
                        <button className="btn">{btnTitle}</button>
                    </form>
                }
            </div>
        </>
    )
}
