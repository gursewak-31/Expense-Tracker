import { FaEdit,  } from "react-icons/fa";
import { FaXmark } from 'react-icons/fa6';
import useUser from "../hooks/useUser";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateProfileImage, updateData } from "../api/authApi";
import useAuthUser from "../hooks/useAuthUser";

export default function Profile(){
    let { setUser } = useUser();
    let user = useAuthUser();
    let [firstName, setFirstName] = useState(user.firstName);
    let [lastName, setLastName] = useState(user.lastName);
    let [email, setEmail] = useState(user.email);
    // let [profileImage, setProfileImage] = useState<File | null>(null);
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [response, setResponse] = useState({success: true, msg: ""});
    let [invalidField, setInvalidField] = useState({firstName: false, lastName: false, email: false});

    async function updateImage(profileImage: File | null){
        let data = new FormData();
        if(profileImage) data.append("profileImage", profileImage);
        data.append("oldImageName", user?.profileImage ?? "");

        let res = await updateProfileImage(data);

        if(res.success && user){
            setUser({...user, profileImage: res.image ? res.image : ""});
        }
        if(res.success)
            setResponse({success: true, msg: res.msg});
        else
            setResponse({success: false, msg: res.msg});

        setIsModalOpen(false);
    }

    async function userUpdate(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        let isValid = validate();
        if(!isValid) return;
        
        let data = {firstName: firstName, ...(lastName && {lastName}), email: email};

        let res = await updateData(data);

        setResponse(res);
    }

    function validate(){
        let isValid = true;

        if(!firstName || !/^[a-zA-Z\s]*$/.test(firstName)){
            setInvalidField(prev => ({...prev, firstName: true}));
            isValid = false;
        }
        if(lastName && !/^[a-zA-Z\s]*$/.test(lastName)){
            setInvalidField(prev => ({...prev, lastName: true}));
            isValid = false;
        }
        if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setInvalidField(prev => ({...prev, email: true}));
            isValid = false;
        }

        return isValid;
    }

    useEffect(() => {
        if(response.msg) setTimeout(() => {setResponse({success: true, msg: ""})}, 3000);
    }, [response]);

    useEffect(() => {
        setInvalidField({...invalidField, firstName: false});
    }, [firstName]);

    useEffect(() => {
        setInvalidField({...invalidField, lastName: false})
    }, [lastName]);

    useEffect(() =>{
        setInvalidField({...invalidField, email: false});
    }, [email]);

    return(
        <div className="p-4 pt-16 flex justify-center">
            <div className="h-full w-200 bg-slate-900 rounded p-6">
                <div className="">
                    <h2 className="text-xl font-semibold text-white">Profile</h2>
                    <p className="text-slate-400 text-sm">Manage your profile information and account security preference.</p>
                </div>

                <div className="mt-5 flex gap-5 py-2">
                    <div className="w-1/3 rounded bg-slate-950 text-center p-4">
                        <div className="relative inline-block">
                            <div className="h-30 w-30 overflow-hidden rounded-full">
                                <img src={user?.profileImage ? `http://localhost:5174/files/${user.profileImage}` : "../../assets/images/default-user.jpg"} className="object-cover w-full h-full"/>
                            </div>
                            <button className="absolute right-0 bottom-0 h-5 w-5 hover:text-white cursor-pointer" onClick={() => setIsModalOpen(true)}><FaEdit/></button>
                        </div>
                        <h5 className="text-white">{firstName} {lastName}</h5>
                        <p className="text-gray-500 text-sm">Welcome</p>
                    </div>

                    <div className="flex-1 bg-slate-950 rounded p-4">
                        <div>
                            <h5 className="border-b text-white">Profile Information</h5>

                            <span className={`text-sm ${response.success ? 'text-green-700' : 'text-green-700'}`}>{response.msg}</span>

                            <form onSubmit={userUpdate}>
                                <div className="py-3">
                                    <div className="flex items-center gap-4 py-3">
                                        <label htmlFor="firstName" className="w-1/5 text-gray-500 text-sm font-medium">First Name: </label>
                                        <input type="text" id="firstName" className={`flex-1 rounded bg-slate-800 border-slate-700 p-2 text-sm ${invalidField.firstName ? 'text-red-700 outline-2 outline-red-700' : 'text-white outline-0'}`} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                    </div>
                                    <div className="flex items-center gap-4 py-3">
                                        <label htmlFor="lastName" className="w-1/5 text-gray-500 text-sm font-medium">Last Name: </label>
                                        <input type="text" id="lastName" className={`flex-1 rounded bg-slate-800 border-slate-700 p-2 text-sm ${invalidField.lastName ? 'text-red-700 outline-2 outline-red-700' : 'text-white outline-0'}`} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                    </div>
                                    <div className="flex items-center gap-4 py-3">
                                        <label htmlFor="email" className="w-1/5 text-gray-500 text-sm font-medium">Email: </label>
                                        <input type="text" id="email" className={`flex-1 rounded bg-slate-800 border-slate-700 p-2 text-sm ${invalidField.email ? 'text-red-700 outline-2 outline-red-700' : 'text-white outline-0'}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3">
                                    <span className="text-xs text-gray-500">Joined On: {new Date(user?.createdAt ?? "").toDateString()}</span>
                                    <div className="flex gap-5">
                                        <button className="cursor-pointer rounded border border-red-700 px-5 py-1 text-red-700 hover:bg-red-700 hover:text-white text-sm transition-colors" onClick={(e) => {
                                            e.preventDefault();
                                            setFirstName(user?.firstName);
                                            setLastName(user?.lastName);
                                            setEmail(user?.email);
                                        }}>Discard</button>
                                        <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="py-4">
                            {/* <h5 className="text-gray-500">Security Credentials</h5> */}
                            <div className="mt-2 flex items-center justify-between gap-4">
                                <div>
                                    <h6 className="text-white">Account Password</h6>
                                    <p className="text-xs text-gray-500">Change or reset the password you use to secure your login access.</p>
                                </div>
                                <Link to={"/accountSettings"}>
                                    <button className="cursor-pointer rounded border border-red-700 px-3 py-2 text-red-700 hover:bg-red-700 hover:text-white text-sm transition-colors">Change Password</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {isModalOpen && <ImageModal setModal = {setIsModalOpen} setProfileImage = {updateImage}/>}
        </div>
    )
}

type ImageModalProps = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    setProfileImage: (profileImage: File | null) => void
}
function ImageModal({setModal, setProfileImage}: ImageModalProps){
    return(
        <div className="absolute left-0 top-0 h-full w-full flex items-center justify-center backdrop-blur-xs">
            <div className="p-6 bg-gray-900 rounded relative">
                <div className="py-2 text-xs text-gray-500 mb-4">
                    <p>Update your profile photo to personalize your account workspace.</p>
                    <button className="text-sm absolute top-2 right-4 cursor-pointer" onClick={() => setModal(false)}><FaXmark/></button>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <input type="file" className="hidden" id="updateImage" onChange={(e) => {
                        let file = e.target.files;
                        if(file) setProfileImage(file[0]);
                    }}/>
                    <label htmlFor="updateImage" className="text-center py-1 px-4 border border-blue-800 rounded text-sm cursor-pointer text-white hover:bg-blue-800">Upload New Image</label>
                    <button className="py-1 px-4 border border-red-800 rounded text-sm hover:bg-red-800 cursor-pointer text-white" onClick={() => setProfileImage(null)}>Remove Current Image</button>
                </div>
            </div>
        </div>
    )
}