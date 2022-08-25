import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import {Redirect, useHistory } from 'react-router-dom';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const sessionUser = useSelector((state=>state.session.user));

    const handleSubmit = (e) => {
        e.preventDefault();
        // history.push('/notes');
        setErrors([]);

        return dispatch(
            sessionActions.login({ credential, password })
            ).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                else history.push('/notes');
            }

        );

    };

    const onClick = () => {
        setErrors([]);
        setCredential("Demo-lition");
        setPassword("password");
        // history.push('/notes');
        return dispatch(sessionActions.login({ credential: "Demo-lition", password:"password" })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                else history.push('/notes');
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <ul>
                {errors.map((error, idx) => (
                    <li className="error-list" key={idx}>{error} </li>
                ))}
            </ul>
            <label>
                <div className="label-name">
                    Username or Email
                </div>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                <div className="label-name">
                    Password
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button className="login-button" type="submit">Log In</button>
            <button className="demo-user" type="button" onClick={onClick}>Demo User</button>
        </form>
    );
}

export default LoginForm;
