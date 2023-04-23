import { useState } from 'react';
import api from '../../api/api';
import SignUp from './SignUp';
import { FetchState } from '../../hooks';
import googleLogo from '../../assets/images/googleLogo.svg';
import discordLogo from '../../assets/images/discordLogo.svg';
import microsoftLogo from '../../assets/images/microsoftLogo.svg';
import styles from './Login.module.css';

const Login = ({ dispatch }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.createSession(email, password);
      const data = await api.getAccount();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };

  const handleDiscordLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.createOAuth2Session('discord');
      const data = await api.getAccount();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.createOAuth2Session('google');
      const data = await api.getAccount();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };

  const handleMicrosoftLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.createOAuth2Session('microsoft');
      const data = await api.getAccount();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };

  return register ? (
    <SignUp setRegister={setRegister} dispatch={dispatch} />
  ) : (
    <section className="container h-screen mx-auto flex">
      <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
        <h1 className="text-6xl font-bold">Login</h1>
        <p className="mt-6">
          {' '}
          Don't have an account ?{' '}
          <span className="cursor-pointer underline" onClick={() => setRegister(true)}>
            Sign Up
          </span>{' '}
        </p>
        <form onSubmit={handleLogin}>
          <label className="block mt-6"> Email</label>
          <input
            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
          />
          <label className="block mt-6"> Password</label>
          <input
            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            autoComplete="password"
          />

          <div className="mt-6">
            <button
              type="submit"
              disabled={!email || !password}
              className="mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
              Login
            </button>
          </div>
          <div className={`mt-6 ${styles.socialLogin}`}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="py-4 font-semibold rounded-lg shadow-md bg-white text-gray-900 border border-gray-400 hover:border-gray-900 hover:text-white hover:bg-gray-900 focus:outline-none">
              <img src={googleLogo} alt="Google Logo" className="h-6 w-6 inline mr-2" />
              Login with Google
            </button>
            <button
              type="button"
              onClick={handleDiscordLogin}
              className="py-4 font-semibold rounded-lg shadow-md bg-white text-gray-900 border border-gray-400 hover:border-gray-900 hover:text-white hover:bg-gray-900 focus:outline-none">
              <img src={discordLogo} alt="Discord Logo" className="h-6 w-6 inline mr-2" />
              Login with Discord
            </button>
            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className="py-4 font-semibold rounded-lg shadow-md bg-white text-gray-900 border border-gray-400 hover:border-gray-900 hover:text-white hover:bg-gray-900 focus:outline-none">
              <img src={microsoftLogo} alt="Microsoft Logo" className="h-6 w-6 inline mr-2" />
              Login with Microsoft
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
