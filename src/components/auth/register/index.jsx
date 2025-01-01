import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();

        // Check for matching passwords
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setErrorMessage(''); // Clear any previous errors

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                // Create user with Firebase auth
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home'); // Redirect to home on successful registration
            } catch (error) {
                // Handle registration errors
                setErrorMessage(error.message || 'Registration failed. Please try again.');
            } finally {
                setIsRegistering(false); // Reset registering state
            }
        }
    };

    // If user is already logged in, redirect to home
    if (userLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return (
        <main className="w-full h-screen flex items-center justify-center">
            <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                <div className="text-center mb-6">
                    <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
                        Create a New Account
                    </h3>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Password</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            required
                            disabled={isRegistering}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Confirm Password</label>
                        <input
                            type="password"
                            autoComplete="off"
                            required
                            disabled={isRegistering}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <span className="text-red-600 font-bold">{errorMessage}</span>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                            isRegistering
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'
                        }`}
                    >
                        {isRegistering ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    {/* Login Link */}
                    <div className="text-sm text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="hover:underline font-bold">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Register;
