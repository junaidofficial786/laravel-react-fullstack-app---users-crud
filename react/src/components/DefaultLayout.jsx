import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const {user, token, setUser, setToken, notification} = useStateContext();

    //fetch authorized user information using side hook
    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data)
        })
    }, []);

    function onLogout(e) {
        e.preventDefault();
        axiosClient.post('/logout').then(() => {
            setUser({})
            setToken(null)
        });
    }

    if (!token) {
        return <Navigate to='/login'/>
    }

    return <>
        <div id="defaultLayout">
            <aside>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/users'>Users</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    </>
}
