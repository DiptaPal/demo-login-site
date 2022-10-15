import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup, TwitterAuthProvider, updateProfile} from 'firebase/auth'

const auth = getAuth(app)
const Registration = () => {
    const [passwordError, setPasswordError] = useState('')
    const googleProvider = new GoogleAuthProvider();
    const twitterProvider = new TwitterAuthProvider()
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();


    const handleRegister = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            handleVerify()
            updateUserName(name)
            form.reset();
        })
        .catch(error => {
            console.error("Error", error);
            setPasswordError(error.message)
        })

    }
    const handleVerify = () =>{
        sendEmailVerification(auth.currentUser)
        .then(() =>{
            alert("Please Check your email and verify your account.")
        })
    }
    const updateUserName = name => {
        updateProfile(auth.currentUser, {displayName: name})
        .then(() =>{
            console.log("User name is updated");
        })
        .catch(error => {
            console.error("Error :", error);
        })
    }
    const handlePasswordError = event =>{
         
        const password = event.target.value;
        console.log(password);
        if(!/(^\S*$)/.test(password)){
            setPasswordError('Password must not contain whitespaces.')
            return;
        }
        if(!/(^(?=.*[A-Z]).*$)/.test(password)){
            setPasswordError('Password must have at least one uppercase character.')
            return;
        }
        if(!/(^(?=.*[a-z]).*$)/.test(password)){
            setPasswordError('Password must have at least one lowercase character.')
            return;
        }
        if(!/(^(?=.*[0-9]).*$)/.test(password)){
            setPasswordError('Password must contain at least one digit.')
            return;
        }
        if(!/(?=.*[!@#$%^&*])/.test(password)){
            setPasswordError('Password must contain at least one special symbol.')
            return;
        }
        if(!/(^.{8,}$)/.test(password)){
            setPasswordError('Password at least 8 characters Long.')
            return;
        }
        setPasswordError('');
    }
    const handleGoogle = () =>{
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => {
            console.error("Error",error);
        })
    }
    const handleTwitter = () =>{
        signInWithPopup(auth, twitterProvider)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => {
            console.error("Error: ", error);
        })
    }
    const handleGithub = () =>{
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => {
            console.error("Error :", error);
        })
    }
    const handleFacebook = () => {
        signInWithPopup(auth, facebookProvider)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error =>{
            console.error("Error: ",error);
        })
    }

    return (
        <div className='pt-48 pb-96'>
            <div className="w-full mx-auto max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
                <h1 className="text-2xl font-bold text-center">Registration</h1>
                <form onSubmit={handleRegister} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <input type="text" name="username" id="username" required placeholder="Username" className="w-full px-4 py-3 rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input type="email" name="email" id="email" required placeholder="Email" className="w-full px-4 py-3 rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input  onChange={handlePasswordError} type="password" name="password" id="password" required placeholder="Password" className="w-full px-4 py-3 rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600" />
                        <p className='text-red-500'>{passwordError}</p>
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600">Registration</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogle} aria-label="Log in with Google" className="p-3 rounded-sm">
                        <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 fill-current"></FontAwesomeIcon>
                    </button>
                    <button onClick={handleTwitter} aria-label="Log in with Twitter" className="p-3 rounded-sm">
                        <FontAwesomeIcon icon={faTwitter} className="w-5 h-5 fill-current"></FontAwesomeIcon>
                    </button>
                    <button onClick={handleGithub} aria-label="Log in with GitHub" className="p-3 rounded-sm">
                        <FontAwesomeIcon icon={faGithub} className="w-5 h-5 fill-current"></FontAwesomeIcon>
                    </button>
                    <button onClick={handleFacebook} aria-label="Log in with Facebook" className="p-3 rounded-sm">
                        <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 fill-current"></FontAwesomeIcon>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 text-gray-600">Do you have an account?
                    <Link rel="noopener noreferrer" to="/login" className="underline text-gray-800">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;