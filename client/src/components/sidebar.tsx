import { Link, useNavigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";
import { logout } from "../api/authApi";
import { LuLayoutDashboard, LuWallet, LuLockKeyhole, LuChevronDown } from "react-icons/lu"
import { useEffect, useState } from "react";
// import { AllowedPages } from "../types/types";

export default function SideBar(){
    let location = useLocation();
    let currentPage = location.pathname;
    let [isExpenseOpen, setIsExpenseOpen] = useState(currentPage == "/addExpense" || currentPage == "/allExpenses");
    let redirect = useNavigate();
    let { user, setUser } = useUser();
    
    async function logoutUser(){
        let res = await logout();

        if(res.success){
            setUser(null);
            redirect("/login");
            return;
        }
    }

    useEffect(() => {
        if(currentPage != "/addExpense" && currentPage != "/allExpenses"){
            setIsExpenseOpen(false);
        }
    }, [currentPage])

    return(
        <>
            <div className="flex h-full w-1/5 flex-col gap-4 bg-slate-900 border-r border-gray-800 p-2">
                <div className="w-full p-2 text-center">
                    <h3 className="text-1xl text-white">Expense Tracker</h3>
                </div>

                <div className="h-auto w-full flex-1">
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0">
                            <Link to={"dashboard"}>
                                <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${currentPage == "/dashboard" ? 'bg-slate-700 text-white' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
                                    <LuLayoutDashboard/>
                                    Dashboard
                                </button>
                            </Link>

                            <div>
                                <button className={`w-full flex justify-between items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer hover:bg-slate-800 hover:text-slate-200`} onClick={() => setIsExpenseOpen(!isExpenseOpen)}>
                                    <div className="flex items-center gap-3">
                                        <LuWallet />
                                        Expenses
                                    </div>
                                    <LuChevronDown className={`transition-transform duration-200 ${isExpenseOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isExpenseOpen && (
                                    <div className="pl-6 mt-1 border-l border-slate-800 ml-5">
                                        <Link to={"allExpenses"}>
                                            <button className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${currentPage == "/allExpenses" ? 'bg-slate-700 text-white' : 'hover:bg-slate-800/50 hover:text-slate-200'}`}>All Expenses</button>
                                        </Link>
                                        <Link to={"addExpense"}>
                                            <button className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium cursor-pointer mt-2 transition-colors ${currentPage == "/addExpense" ? 'bg-slate-700 text-white' : 'hover:bg-slate-800/50 hover:text-slate-200'}`}>Add Expenses</button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link to={"/accountSettings"}>
                                <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${currentPage == "/accountSettings" ? 'bg-slate-700 text-white' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
                                    <LuLockKeyhole/>
                                    Account Settings
                                </button>
                            </Link>
                        </nav>
                    </aside>
                </div>

                <div className="w-full p-1 bg-slate-700 border border-slate-500 rounded-md">
                    <div className="flex gap-2">
                        <div className="w-15 h-12 rounded-4xl overflow-hidden">
                            <img src={user?.profileImage ? `http://localhost:5174/files/${user.profileImage}` : "../assets/images/default-user.jpg"} alt="profile" className="w-full h-full object-cover"/>
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <div>
                                <span className="block text-white">{user?.firstName} {user?.lastName}</span>
                                <span className="text-sm text-gray-500">{user?.email}</span>
                            </div>
                            <div className="px-2 relative group"> 
                                <nav className="absolute w-25 p-1 bottom-1/1 right-1/2 rounded bg-slate-800 hidden group-hover:block">
                                    <Link to={"/profile"}>
                                        <button className="w-full text-left text-xs p-1 cursor-pointer hover:text-white">
                                            Profile
                                        </button>
                                    </Link>
                                    <button className="w-full text-left text-xs p-1 cursor-pointer hover:text-white" onClick={logoutUser}>
                                        Logout
                                    </button>
                                </nav>
                                <span className="text-white">⋮</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}