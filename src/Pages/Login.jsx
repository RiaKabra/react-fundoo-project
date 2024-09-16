import {React,useState} from 'react';
import { TextField, Button, Typography, Box, Alert, alertClasses } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; 
import '../Style/login.css';
import { login } from '../Services/userService';
import googleLogo from '../Assests/google-logo.png';  

function Login() {
        const [formData, setFormData] = useState({
            email: '',
            password: ''
        });
const navigate = useNavigate();
const send = async()=>{
        let res = await login(formData);

        console.log(res);
        localStorage.setItem('token', res?.data.data);
        navigate('/dashboard');
}
    const handleSubmit = async () => {
        if (formData.email === "" || formData.password === "") {
            alert('please enter all the details');
        } else {
            send();
    };
}

    return (
        <Box className="login-box">
            <Box textAlign="center" marginBottom={2}>
                <img src={googleLogo} alt="Google Logo" className="google-logo" /> 
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <Typography variant="subtitle1">
                    Use your Google Account
                </Typography>
            </Box>

            <TextField
                type='email'
                label="Email or phone"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                name = 'email'
                value={formData.email}
                onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
            />


            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                name = 'password'
                value={formData.password}
                onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
            />

            <Box display="flex" justifyContent="space-between" marginBottom={2}>
                <Link href="#" variant="body2">
                    Forgot Password?
                </Link>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                {}
                <Link to='/signup'>
                            <Button variant="text" color="primary" fullWidth>
                                Create account
                            </Button>
                </Link>

                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Login
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
