import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";

const LoginFormModal = () => {

    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    // const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setIsLoading(true);
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            // .then(
            //     setTimeout(() => {
            //         setIsLoading(false);
            //         closeModal();
            //     }, 500)
            // )
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                // if (data) {
                //     setTimeout(() => {
                //         setIsLoading(false);
                //         if (data.errors) setErrors(data.errors);
                //     }, 500);
                // }
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
            {/* {isLoading && <div class="spinner-border text-primary" role="status" style={{
                display: 'flex',
                zIndex: '99',
                position: 'absolute',
                marginLeft: '30%',
                marginTop: '-40%'
            }}>
                <span class="visually-hidden">Loading...</span>
            </div>} */}
        </div>
    );
}

export default LoginFormModal
