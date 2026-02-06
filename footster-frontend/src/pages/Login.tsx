import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useError } from '../hooks/customHooks'
import { toast, ToastContainer } from 'react-toastify'
import api from '../services/axios'
import {checkAuth} from '../app/features/user/userSlice.js'
import { useDispatch } from 'react-redux'

export function Register() {
  const [error, setError] = useError();
  const [already, setAlready] = useState("")
  const navigate = useNavigate();
  const inputElem = useRef({ name: null, email: null, password: null })

  async function setData(e) {
    e.preventDefault();
    const name = inputElem.current.name.value;
    const email = inputElem.current.email.value;
    const password = inputElem.current.password.value;

    try {
      const { data } = await api.get(`/user/all?email=${email}`);
      if (data.length > 0) {
        setAlready("User already Exist");
        return;
      }
      setAlready("");
    } catch (err) { console.log(err.message); }

    if (!error.name && !error.email && !error.password && !error.conpass) {
      try {
        const { data } = await api.post('/user/register', { name, email, password });
        if (data.status === 200) {
          toast.success("Registered Successfully!");
          setTimeout(() => { navigate('/login') }, 1000);
        }
      } catch (error) { console.log(error.message); }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Mobile-Hidden Image Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center p-12 text-white relative">
          <div className="z-10">
            <h2 className="text-4xl font-black mb-4">Step into Style.</h2>
            <p className="text-gray-400 font-medium">For every FOOTSTEP, we have the perfect pair waiting for you.</p>
          </div>
          <div className="absolute inset-0 opacity-20 bg-[url('/loginpage.png')] bg-cover bg-center"></div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
            <p className="text-gray-500 font-medium mt-1">Join the FootSter community today.</p>
          </div>

          <form onSubmit={setData} className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase text-gray-400 tracking-widest block mb-2">Name</label>
              <input ref={e => inputElem.current.name = e} onChange={e => setError({ type: "name", value: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all" type="text" required placeholder="John Doe" />
              <p className="text-[10px] text-red-500 font-bold mt-1 h-3">{error.name}</p>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-gray-400 tracking-widest block mb-2">Email</label>
              <input ref={e => inputElem.current.email = e} onChange={e => setError({ type: "email", value: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all" type="email" required placeholder="name@company.com" />
              <p className="text-[10px] text-red-500 font-bold mt-1 h-3">{error.email || already}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase text-gray-400 tracking-widest block mb-2">Password</label>
                <input ref={e => inputElem.current.password = e} onChange={e => setError({ type: "password", value: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all" type="password" required placeholder="••••••••" />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-400 tracking-widest block mb-2">Confirm</label>
                <input onChange={e => setError({ type: "conpass", value: e.target.value, pass: inputElem.current.password.value })} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all" type="password" required placeholder="••••••••" />
              </div>
            </div>
            <p className="text-[10px] text-red-500 font-bold h-3">{error.password || error.conpass}</p>

            <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-black hover:bg-gray-800 transition-all active:scale-[0.98] mt-4 shadow-lg shadow-gray-200">
              Sign up now
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-bold text-gray-500">
            Already have an account? <Link to="/login" className="text-black underline underline-offset-4">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}


export default function Login() {
  const [error, setError] = useError();
  const [err, setErr] = useState({});
  const [forgot, setForgot] = useState('');
  const navigate = useNavigate();
  const inputElem = useRef({ email: null, password: null });
  const dispatch = useDispatch();

  async function checkUser(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/user/login", {
        email: inputElem.current.email.value,
        password: inputElem.current.password.value
      });

      toast.success(`Welcome back, ${data.name}`);
      const path = data.role === "admin" ? '/dashboard' : '/';
      dispatch(checkAuth());
      setTimeout(() => { navigate(path) }, 1000);
    } catch (error) {
      const obj = {};
      if (error.status === 404) obj.email = "User not found!";
      else if (error.status === 401) obj.password = "Incorrect password!";
      else toast.warning("Something went wrong");
      setErr(obj);
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-row-reverse">
        
        {/* Image Section - Hidden on Mobile */}
        <div className="hidden lg:flex lg:w-1/2 bg-yellow-400 items-center justify-center p-12 relative overflow-hidden">
          <div className="z-10 text-black">
            <h2 className="text-4xl font-black mb-4 italic">FootSter.</h2>
            <p className="font-bold opacity-70 leading-relaxed">Login to access your orders, wishlist, and exclusive member discounts.</p>
          </div>
          <img className="absolute -right-20 -bottom-20 h-96 opacity-30 rotate-12" src="./loginpage.png" alt="shoes" />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900">Login</h2>
            <p className="text-gray-500 font-medium mt-1">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={checkUser} className="space-y-6">
            <div>
              <label className="text-xs font-black uppercase text-gray-400 tracking-widest block mb-2">Email Address</label>
              <input ref={e => inputElem.current.email = e} onChange={e => setError({ type: "email", value: e.target.value })} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-1 focus:ring-black outline-none transition-all" type="email" required placeholder="name@company.com" />
              <p className="text-[10px] text-red-500 font-bold mt-1 h-3">{err.email || error.email || forgot}</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black uppercase text-gray-400 tracking-widest block">Password</label>
                <button type="button" onClick={() => navigate('/forgot')} className="text-[10px] font-black uppercase text-gray-400 hover:text-black">Forgot?</button>
              </div>
              <input ref={e => inputElem.current.password = e} onChange={e => setError({ type: "password", value: e.target.value })} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-1 focus:ring-black outline-none transition-all" type="password" required placeholder="••••••••" />
              <p className="text-[10px] text-red-500 font-bold mt-1 h-3">{err.password || error.password}</p>
            </div>

            <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-black hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg">
              Sign In
            </button>
          </form>

          <p className="text-center mt-10 text-sm font-bold text-gray-500">
            New here? <Link to="/signup" className="text-black underline underline-offset-4">Create account</Link>
          </p>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}