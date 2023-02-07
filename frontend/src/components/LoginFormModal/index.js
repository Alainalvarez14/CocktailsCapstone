import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
// import { Redirect } from 'react-router-dom';
import { useModal } from "../../context/Modal";
// import "./LoginForm.css"

const LoginFormModal = () => {

    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // if (sessionUser) return (
    //     <Redirect to="/" />
    // );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const handleSubmitDemoUser = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div>
            <h1 style={{
                display: "flex",
                justifyContent: 'center',
                marginBottom: '2vh',
            }}>Log In</h1>
            {/* <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
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
                <button type="submit">Log In</button>
            </form> */}
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div class="form-group" style={{
                    paddingBottom: '1vh'
                }}>
                    <label for="exampleInputEmail1">Username or Email address</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={credential} onChange={(e) => setCredential(e.target.value)} required />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" style={{
                    display: "flex",
                    marginRight: "auto",
                    marginLeft: 'auto',
                    marginTop: '1.2vh',
                    width: '7.5rem',
                    justifyContent: 'center'
                }} class="btn btn-primary">Log In</button>

                <button class="btn btn-primary" style={{
                    display: "flex",
                    marginRight: "auto",
                    marginLeft: 'auto',
                    marginTop: '1.2vh',
                    width: '7.5rem',
                    justifyContent: 'center'
                }} onClick={(e) => handleSubmitDemoUser(e)}>
                    Demo Login
                </button>
            </form>
        </div>
    );
}

export default LoginFormModal
