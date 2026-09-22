import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signup } from "../api/authApi";

export default function SignUp(){
    let [isShowPass, setIsShowPass] = useState(false);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [image, setImage] = useState<File | null>(null);
    let [invalidField, setInvalidField] = useState({name: "", email: "", password: "", image: ""});
    let [response, setResponse] = useState("");
    let redirect = useNavigate();

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        let isValid = validate();
        if(!isValid){
            return;
        }

        let data = new FormData();
        data.append("firstName", firstName);
        if(lastName) data.append("lastName", lastName);
        data.append("email", email);
        data.append("password", password);
        if(image) data.append("profileImage", image);

        // let data = {firstName: firstName, lastName: lastName, email: email, password: password};
        let res = await signup(data);

        if(res.success){
            redirect("/dashboard");
            return;
        }

        setResponse(res.msg);
    }

    function validate(){
        let isValid = true;
        let allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

        if(!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]*$/.test(lastName)){
            setInvalidField(prev => ({...prev, name: "Name should contain only letters."}));
            isValid = false;
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setInvalidField(prev => ({...prev, email: "Please enter a valid email address."}));
            isValid = false;
        }
        if(!/^.{8,32}$/.test(password)){
            setInvalidField(prev => ({...prev, password: "Password must be at least 8 characters long."}));
            isValid = false;
        }
        if(image && !allowedImageTypes.includes(image.type)){
            setInvalidField(prev => ({...prev, image: "Invalid Image type. .jpg, .png and webp allowed only."}));
            isValid = false;
        }
        if(image && image.size > (5 * 1024 * 1024)){
            setInvalidField(prev => ({...prev, image: "Image size must be less then 5 mb."}));
            isValid = false;
        }

        return isValid;
    }

    useEffect(() => {
        setTimeout(() => setInvalidField({name: "", email: "", password: "", image: ""}), 5000);
    }, [invalidField])

    useEffect(() => {
        setTimeout(() => setResponse(""), 5000);
    }, [response])

    return (
        <>
            <div className="flex h-screen w-auto items-center justify-center bg-slate-950">
                <div className="md:w-1/3 sm:w-1/2 w-full rounded-2xl border border-slate-600 bg-slate-900 p-3 text-white">
                    <div className="w-full p-2 text-center">
                        <h2 className="font-bold">Create an Account</h2>
                        <span className="text-xs text-gray-500">Set up your profile in seconds.</span>
                    </div>

                    <form onSubmit={submit}>
                        <div className="flex flex-col py-6 text-sm">
                            <div className="p-2">
                                <div className="flex gap-x-5 ">
                                    <input type="text" className="w-1/2 border-b p-1 outline-0 transition-colors hover:placeholder:text-white" placeholder="*First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                    <input type="text" className="w-1/2 border-b p-1 outline-0 transition-colors hover:placeholder:text-white" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                </div>
                                {invalidField.name && (
                                    <span className="text-xs text-red-700">* {invalidField.name}</span>
                                )}
                            </div>

                            <div className="p-2">
                                <input type="text" className="w-full border-b p-1 outline-0 transition-colors hover:placeholder:text-white" placeholder="*Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                {invalidField.email && (
                                    <span className="text-xs text-red-700">* {invalidField.email}</span>
                                )}
                            </div>

                            <div className="p-2">
                                <div className="relative">
                                    <input type={isShowPass ? "text" : "password"} className="w-full border-b p-1 outline-0 transition-colors hover:placeholder:text-white" placeholder="*Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <button className="cursor-pointer absolute right-2 bottom-1/4" type="button" onClick={() => setIsShowPass(!isShowPass)}>
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

                            <div className="p-2">
                                <input type="file" className="w-full border-b p-1 outline-0 text-gray-400 transition-colors hover:text-white file:mr-4 file:rounded file:bg-indigo-600 hover:file:bg-indigo-700 file:py-1 file:px-2 file:text-white " onChange={(e) => {
                                    let file = e.target.files;
                                    if(file) setImage(file[0]);
                                }}/>
                                {invalidField.image && (
                                    <span className="text-xs text-red-700">* {invalidField.image}</span>
                                )}
                            </div>

                            {response && (
                                <span className="text-xs text-red-700 ps-2">* {response}</span>
                            )}

                            <div className="p-2 text-center">
                                <input type="submit" className="w-1/3 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors p-2 cursor-pointer" value="Sign Up" />
                                <p className="text-sm text-gray-500 mt-2">Already have an account? <Link to="/login" className="text-white">Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}