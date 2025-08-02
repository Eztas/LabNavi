import { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
　const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignIn = () => {
    // This is a dummy handler.
    // In a real app, you would perform authentication here.
    onLoginSuccess();
  };
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Sign Upボタンが押されました');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signUpName,
          email: signUpEmail,
          password: signUpPassword,
        }),
      });
      if (res.ok) {
        onLoginSuccess();
      } else {
        
        alert('サインアップに失敗しました');
      }
    } catch (err) {
      alert('通信エラーが発生しました');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className={`relative w-full max-w-4xl min-h-[480px] bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 ease-in-out ${isSignUp ? 'md:w-[calc(100%/2)]' : 'md:w-full'}`}>

        {/* Sign In Form */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out ${isSignUp ? 'transform translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'}`}>
          <form className="flex flex-col items-center justify-center h-full px-12 bg-white">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <div className="flex my-4">
              <button type="button" className="flex items-center justify-center w-12 h-12 mx-2 border border-gray-300 rounded-full ">
                <FaGithub />
              </button>
              <button type="button" className="flex items-center justify-center w-12 h-12 mx-2 border border-gray-300 rounded-full">
                <FaGoogle />
              </button>
            </div>
            <span className="text-sm text-gray-500">or use your account</span>
            <input className="w-full p-3 my-2 bg-gray-100 border-none" type="email" placeholder="Email" />
            <input className="w-full p-3 my-2 bg-gray-100 border-none" type="password" placeholder="Password" />
            <a href="#" className="my-3 text-sm">Forgot your password?</a>
            <button type="button" onClick={handleSignIn} className="px-12 py-3 text-white uppercase bg-blue-600 rounded-full">Sign In</button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out ${isSignUp ? 'transform translate-x-full opacity-100 z-10' : 'transform translate-x-0 opacity-0'}`}>
           <form className="flex flex-col items-center justify-center h-full px-12 bg-white">
            <h1 className="text-3xl font-bold">Create Account</h1>
             <div className="flex my-4">
               <button type="button" className="flex items-center justify-center w-12 h-12 mx-2 border border-gray-300 rounded-full"><FaGithub /></button>
               <button type="button" className="flex items-center justify-center w-12 h-12 mx-2 border border-gray-300 rounded-full"><FaGoogle /></button>
             </div>
            <span className="text-sm text-gray-500">or use your email for registration</span>
            <input
              className="w-full p-3 my-2 bg-gray-100 border-none"
              type="text"
              placeholder="Name"
              value={signUpName}
              onChange={e => setSignUpName(e.target.value)}
            />
            <input
              className="w-full p-3 my-2 bg-gray-100 border-none"
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={e => setSignUpEmail(e.target.value)}
            />
            <input
              className="w-full p-3 my-2 bg-gray-100 border-none"
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={e => setSignUpPassword(e.target.value)}
            />
            <button
              onClick={handleSignUp}
              type="button"
              className="px-12 py-3 mt-4 text-white uppercase bg-blue-600 rounded-full"
            >
              Sign Up
            </button>
          </form>
        </div>
        
        {/* Overlay */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-20 ${isSignUp ? 'transform -translate-x-full' : 'transform translate-x-0'}`}>
          <div className="relative w-[200%] h-full text-white bg-gradient-to-r from-purple-600 to-blue-600 transition-transform duration-700 ease-in-out transform translate-x-0">
            {/* Overlay Panels */}
            <div className={`absolute top-0 flex flex-col items-center justify-center w-1/2 h-full px-10 text-center transition-transform duration-700 ease-in-out ${isSignUp ? 'transform translate-x-0' : 'transform -translate-x-1/4'}`}>
              <h1 className="text-3xl font-bold">みなさんこんにちは！</h1>
              <p className="mt-4">Naitei-Site</p>
              <button onClick={togglePanel} className="px-12 py-3 mt-4 uppercase bg-transparent border-2 border-white rounded-full">Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;