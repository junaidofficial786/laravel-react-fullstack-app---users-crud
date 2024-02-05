import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./Views/Login.jsx";
import Signup from "./Views/Signup.jsx";
import Users from "./Views/Users.jsx";
import NotFound404 from "./Views/NotFound404.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./Views/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/', element: <Navigate to='/dashboard'/>
            },
            {
                path: '/users', element: <Users/>
            },
            {
                path: '/dashboard', element: <Dashboard/>
            }
            ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login', element: <Login/>
            },
            {
                path: '/signup', element: <Signup/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound404/>
    },
])

export default router;
