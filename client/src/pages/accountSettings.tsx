import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updatePassword, deactivate } from "../api/authApi";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function AccountSettings(){
    let [currPassword, setCurrPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [confPassword, setconfPassword] = useState("");
    let [isShowCurrPass, setIsShowCurrPass] = useState(false);
    let [isShowNewPass, setIsShowNewPass] = useState(false);
    let [isShowConfPass, setIsShowConfPass] = useState(false);
    let [response, setResponse] = useState({success: false, msg: ""});
    let [isModalOpen, setIsModalOpen] = useState(false);
    let { setUser } = useUser();
    let redirect = useNavigate();

    async function changePassword(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        let isValid = validate();
        if(!isValid) return;

        let data = {currentPassword: currPassword, newPassword: newPassword, confirmPassword: currPassword};
        let res = await updatePassword(data);

        setResponse(res);
    }

    async function deleteAccount(){
        let res = await deactivate();

        if(res.success){
            setUser(null);
            redirect("/login");
        }
    }

    function validate(){
        let isValid = true;

        if(currPassword === ''){
            setResponse({success: false, msg: "Please enter current password."});
            isValid = false;
        }else if(!/^.{8,32}$/.test(newPassword)){
            setResponse({success: false, msg: "New password must be atleast 8 characters long."});
            isValid = false;
        }else if(newPassword !== confPassword){
            setResponse({success: false, msg: "New password and Confirm password do not match."});
            isValid = false;
        }

        return isValid;
    }

    useEffect(() => {
        if(response.msg) setTimeout(() => setResponse({success: false, msg: ""}), 3000);
    }, [response])

    return (
        <>
            <div className="p-4 pt-16 h-full">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-white mb-1">Update Password</h2>
                    <p className="text-sm text-slate-400 mb-6">Ensure your account is using a long, random password to stay secure.</p>

                    <form className="space-y-4" onSubmit={changePassword}>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Current Password</label>
                            <div className="relative">
                                <input type={isShowCurrPass ? "text" : "password"} placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" value={currPassword} onChange={(e) => setCurrPassword(e.target.value)}/>
                                <button className="absolute right-3 cursor-pointer h-full" onClick={(e) => {
                                    e.preventDefault();
                                    setIsShowCurrPass(!isShowCurrPass);
                                }}>
                                    {isShowCurrPass ? <FaEye/> : <FaEyeSlash/>}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">New Password</label>
                                <div className="relative">
                                    <input type={isShowNewPass ? "text" : "password"} placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                                    <button className="absolute right-3 cursor-pointer h-full" onClick={(e) => {
                                        e.preventDefault();
                                        setIsShowNewPass(!isShowNewPass)
                                    }}>
                                        {isShowNewPass ? <FaEye/> : <FaEyeSlash/>}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <input type={isShowConfPass ? "text" : "password"} placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" value={confPassword} onChange={(e) => setconfPassword(e.target.value)}/>
                                    <button className="absolute right-3 cursor-pointer h-full" onClick={(e) => {
                                        e.preventDefault();
                                        setIsShowConfPass(!isShowConfPass);
                                    }}>
                                        {isShowConfPass ? <FaEye/> : <FaEyeSlash/>}
                                    </button>
                                </div>
                            </div>
                            {response.msg && (
                                <span className={`text-xs ${response.success ? 'text-green-700' : 'text-red-700'}`}>* {response.msg}</span>
                            )}
                        </div>

                        <div className="flex justify-end pt-2">
                            <button type="submit" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-6 mt-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-red-400 mb-1">Deactivate Account</h2>
                    <p className="text-sm text-slate-400 mb-6">
                        Once you deactivate your account, your profile and content will be deleted. You can't reactivate it later.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-red-950/40 rounded-lg border border-red-900/20">
                        <div>
                            <h3 className="text-sm font-medium text-slate-200">Deactivate this account</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Permanently disable your account.</p>
                        </div>
                        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            Deactivate Account
                        </button>
                    </div>
                </div>
                {isModalOpen && <DeactivateModal setModalOpen = {setIsModalOpen} deleteAccount = {deleteAccount}/>}
            </div>
        </>
    )
}

type DeactivateModalProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    deleteAccount: () => void
}
function DeactivateModal({setModalOpen, deleteAccount}: DeactivateModalProps){
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-500/10 text-red-400 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Delete Account?</h3>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Are you sure you want to deactivate your account? This action will delete your profile immediately.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg transition-colors cursor-pointer" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer" onClick={() => {
                    setModalOpen(false);
                    deleteAccount();
                }}>
                Yes, Deactivate
              </button>
            </div>
          </div>
        </div>
    )
}