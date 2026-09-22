import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login(){
    let [isShowPass, setIsShowPass] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [invalidField, setInvalidField] = useState({email: "", password: ""});
    let [response, setResponse] = useState("");
    let redirect = useNavigate();

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        let isValid = validate();
        if(!isValid){
            return;
        }

        let res = await login({email: email, password: password});

        if(res.success){
            redirect("/dashboard");
            return;
        }

        setResponse(res.msg);
    }

    function validate(){
        let isValid = true;
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setInvalidField(prev => ({...prev, email: "Please enter a valid email address."}));
            isValid = false;
        }

        if(!/^.{8,32}$/.test(password)){
            setInvalidField(prev => ({...prev, password: "Password must be at least 8 characters long."}));
            isValid = false;
        }

        return isValid;
    }

    useEffect(() => {
        setTimeout(() => setInvalidField({email: "", password: ""}), 5000);
    }, [invalidField])

    useEffect(() => {
        setTimeout(() => setResponse(""), 5000);
    }, [response]);

    return(
        <>
           <div className="flex h-screen w-auto items-center justify-center bg-slate-950">
            <div className="md:w-1/3 sm:w-1/2 w-full rounded-2xl bg-slate-900 border border-slate-600 p-3 text-white">
                <div className="w-full p-2 text-center">
                    <h2 className="font-bold">Welcome</h2>
                    <span className="text-gray-500 text-xs">Enter your credentials to access your account.</span>
                </div>
                
                <form onSubmit={submit}>
                    <div className="flex flex-col gap-3 py-6 text-sm">
                        <div className="p-2">
                            <input className="w-full border-b p-1 outline-0 transition-colors hover:placeholder:text-white" type="email" placeholder="*Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            {invalidField.email && (
                                <span className="text-xs text-red-700">* {invalidField.email}</span>
                            )}
                        </div>
                        <div className="p-2">
                            <div className=" relative">
                                <input type={isShowPass ? "text" : "password"} className="w-full border-b p-1 outline-0 transition-colors hover:placeholder:text-white" placeholder="*Password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={32}/>
                                <button className="cursor-pointer absolute right-1 bottom-1/5" type="button" onClick={() => setIsShowPass(!isShowPass)}>
                                    {isShowPass ? (
                                        <FaEye/>
                                    ) : (
                                        <FaEyeSlash/>
                                    )}
                                </button>
                            </div>
                            {invalidField.password && (
                                <span className="text-xs text-red-700">* {invalidField.password}</span>
                            )}
                        </div>
                        {response && (
                            <span className="text-xs text-red-700 ps-2">* {response}</span>
                        )}
                        <div className="p-2 text-center">
                            <input type="submit" className="bg-indigo-600 hover:bg-indigo-700 transition-colors p-2 w-1/3 rounded cursor-pointer text-sm" value="Login"/>
                            <p className="mt-2 text-gray-500 text-sm">Don't have an account? <Link to="/signup" className="text-white">Sign Up</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}