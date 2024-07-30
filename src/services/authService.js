import axios from 'axios';

const API_URL = 'http://portpricetracker-env.eba-jtfkf2ms.us-east-1.elasticbeanstalk.com/api/auth/';

const register = (username, password, email, phoneNumber, firstName, lastName) => {
    return axios.post(API_URL + 'register', {
        username,
        password,
        email,
        phoneNumber,
        firstName,
        lastName
    });
};

const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL + 'login', {
            username,
            password
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
    }
};


const logout = () => {
    localStorage.removeItem('user');
    setAuthToken(null);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Set the token if user is already logged in
const user = getCurrentUser();
if (user && user.token) {
    setAuthToken(user.token);
}

const getUserRole = () => {
    const user = getCurrentUser();
    return user ? user.roles[0] : null;
};


export default {
    register,
    login,
    logout,
    getCurrentUser,
    getUserRole
};
