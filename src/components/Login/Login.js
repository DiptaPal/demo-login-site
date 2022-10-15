import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';

const auth = getAuth(app)
const Login = () => {
    const [userEmail, setUserEmail] = useState('')
    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            alert(`Log in successful with: ${user.displayName}`);
            form.reset();
            console.log(user);
        })
        .catch(error => {
            console.error("Error: ",error);
        })

    }
    const handleEmailBlur = event =>{
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }
    const handlePasswordReset = () => {
        if(!userEmail){
            alert('Please enter your email address.')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(()=>{
            alert('Password Reset email sent. Please check your email.')
        })
        .catch(error =>{
            console.log("Error: ",error);
        })
    }
    return (
        <div className='pt-48 pb-96'>
            <div className="w-full mx-auto max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
                <h1 className="text-2xl font-bold text-center">Log In</h1>
                <form onSubmit={handleLogin} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input onBlur={handleEmailBlur} type="email" name="email" id="email" required placeholder="Email" className="w-full px-4 py-3 rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input type="password" name="password" id="password" required placeholder="Password" className="w-full px-4 py-3 rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600" />
                        <div className="flex justify-end text-xs text-gray-600">
                            <Link onClick={handlePasswordReset} rel="noopener noreferrer" to="#">Forgot Password?</Link>
                        </div>
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600">Log In</button>
                </form>
                <p className="text-xs text-center sm:px-6 text-gray-600">Don't have an account?
                    <Link rel="noopener noreferrer" to="/registration" className="underline text-gray-800">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;