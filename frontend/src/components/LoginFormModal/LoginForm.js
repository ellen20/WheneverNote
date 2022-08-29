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
    let err = 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        await dispatch(
            sessionActions.login({ credential, password })
            ).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                    err = 1;
                }
            }

        );
        if(err != 1) history.push('/notes');
    };

    const onClick = async () => {
        setErrors([]);
        setCredential("Demo-lition");
        setPassword("password");

        await dispatch(sessionActions.login({ credential: "Demo-lition", password:"password" })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                    err = 1;
                }
            }
        );

        if(err != 1) history.push('/notes');
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
