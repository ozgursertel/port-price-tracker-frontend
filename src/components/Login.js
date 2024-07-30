import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            navigate('/');
            window.location.reload();
        } catch (error) {
            setErrorMessage('Invalid username or password.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>PPT LOGIN</h3>
                        </div>
                        <div className="card-body">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
