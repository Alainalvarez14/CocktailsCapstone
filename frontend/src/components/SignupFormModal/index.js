import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { useModal } from "../../context/Modal";

function SignupFormModal() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div>
            <h1 style={{
                display: "flex",
                justifyContent: 'center',
                marginBottom: '2vh'
            }}>Sign Up</h1>
            {/* <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form> */}
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div class="form-group" style={{
                    paddingBottom: '1vh',
                }}>
                    {/* <label for="exampleInputEmail1">Email address</label> */}
                    <input type="text" class="form-control inputField" id="Email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    {/* <label for="exampleInputPassword1">Username</label> */}
                    <input type="text" class="form-control inputField" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div class="form-group">
                    {/* <label for="exampleInputPassword1">First name</label> */}
                    <input type="text" class="form-control inputField" id="FirstName" placeholder="First name" value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required />
                </div>
                <div class="form-group">
                    {/* <label for="exampleInputPassword1">Last name</label> */}
                    <input type="text" class="form-control inputField" id="LastName" placeholder="Last name" value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required />
                </div>
                <div class="form-group">
                    {/* <label for="exampleInputPassword1">Password</label> */}
                    <input type="password" class="form-control inputField" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div class="form-group">
                    {/* <label for="exampleInputPassword1">Confirm password</label> */}
                    <input type="password" class="form-control inputField" id="ConfirmPassword" placeholder="Confirm Password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                </div>
                <button type="submit" style={{
                    display: "flex",
                    marginRight: "auto",
                    marginLeft: 'auto',
                    marginTop: '1.2vh'
                }} class="btn btn-primary">Sign up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
