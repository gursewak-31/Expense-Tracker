import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense, updateExpense } from "../api/expenseApi";
import type { StoredExpense, ExpenseCateogry, EntriesPP, NewExpense, UpdateExpense } from "../types/types";
import { FaXmark } from 'react-icons/fa6';

export default function AllExpenses(){
    let [data, setData] = useState<StoredExpense[] | null>(null);
    let [sortBy, setSortBy] = useState<"expense" | "amount" | "category" | "createdAt">("createdAt");
    let [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
    let [search, setSearch] = useState("");
    let [filter, setFiler] = useState<ExpenseCateogry>("all");
    let [entriesPP, setEntriesPP] = useState<EntriesPP>("5");
    let [totalRecords, setTotalRecords] = useState(0);
    let [page, setPage] = useState(1);
    let [updatingData, setUpdatingData] = useState<NewExpense>({expense: "", amount: 0, category: ""});
    let [updatingId, setUpdatingId] = useState("");
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [updateResponse, setUpdateResponse] = useState({success: false, msg: ""});

    async function getData(){
        let data = await getExpenses(sortBy, sortOrder, search, filter, entriesPP, page);

        if(data){
            setTotalRecords(data.totalRecords);
            setData(data.data);
        }
    }

    async function deleteData(id: string){
        let res = await deleteExpense(id);

        if(res.success){
            getData();
        }
    }

    async function updateData(data: UpdateExpense){
        let res = await updateExpense(data, updatingId);

        setUpdateResponse(res);

        if(res.success){
            getData();
        }
    }
    
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setPage(1);
        if(page == 1) getData(); // if page is already 1 then setPage() not change any state so no re-render occur
    }, [sortBy, sortOrder, filter, search, entriesPP])

    useEffect(() => {
        getData();
    }, [page]);

    useEffect(() => {
        if(updateResponse.msg) setTimeout(() => setUpdateResponse({success: false, msg: ""}), 3000);
    }, [updateResponse])

    return(
        <>
            <div className="p-4 pt-16">
                <h2 className="mb-2 text-white">All Expenses</h2>
                <div className="w-full rounded border border-slate-700 bg-slate-900 p-4">
                    <div className="w-full p-2 mb-4 flex justify-between">
                        <div className="flex items-center gap-6">
                            <label htmlFor="CategorySort" className="text-white">Category: </label>
                            <select id="CategorySort" className="text-white outline-0 focus:bg-slate-900 border border-slate-700 p-1 rounded-md" value={filter} onChange={(e) => setFiler(e.target.value as ExpenseCateogry)}>
                                <option value="all">All</option>
                                <option value="shopping">Shopping</option>
                                <option value="food">Food</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="travel">Travel</option>
                                <option value="other">Other</option>
                            </select>

                            <label htmlFor="entries" className="text-white">Entries: </label>
                            <select id="entries" className="text-white outline-0 focus:bg-slate-900 border border-slate-700 rounded-md px-2 py-1" value={entriesPP} onChange={(e) => setEntriesPP(e.target.value as EntriesPP)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        <div className="">
                            <input type="text" placeholder="...search" className="text-white p-2 border border-slate-700 rounded outline-0" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <table className="w-full rounded-2xl">
                        <thead>
                            <tr className="text-white bg-slate-700">
                                <th className="border border-slate-500 p-1">
                                    <div className="flex justify-center cursor-pointer" onClick={() => {
                                        setSortBy("expense");
                                        setSortOrder(sortOrder == "ASC" ? "DESC" : "ASC");
                                    }}>
                                        Expense 
                                        <div className="p-0 inline-flex flex-col">
                                            <button className={`p-0 leading-none h-3 ${sortOrder == 'ASC' && sortBy == 'expense' ? "text-white" : "text-slate-500"}`}>▴</button>
                                            <button className={`p-0 leading-none h-3 ${sortOrder == 'DESC' && sortBy == 'expense' ? "text-white" : "text-slate-500"}`}>▾</button>
                                        </div>
                                    </div>
                                </th>
                                <th className="border border-slate-500 p-1">
                                    <div className="flex justify-center cursor-pointer" onClick={() => {
                                        setSortBy("amount");
                                        setSortOrder(sortOrder == "ASC" ? "DESC" : "ASC");
                                    }}>
                                        Amount 
                                        <div className="p-0 inline-flex flex-col">
                                            <button className={`p-0 leading-none h-3 ${sortOrder == 'ASC' && sortBy == 'amount' ? "text-white" : "text-slate-500"}`}>▴</button>
                                            <button className={`p-0 leading-none h-3 ${sortOrder == 'DESC' && sortBy == 'amount' ? "text-white" : "text-slate-500"}`}>▾</button>
                                        </div>
                                    </div>
                                </th>
                                <th className="border border-slate-500 p-1">
                                    <div className="flex justify-center cursor-pointer" onClick={() => {
                                        setSortBy("category");
                                        setSortOrder(sortOrder == "ASC" ? "DESC" : "ASC");
                                    }}>
                                        Category
                                        <div className="p-0 inline-flex flex-col">
                                            <button className={`p-0 leading-none h-3 ${sortOrder == 'ASC' && sortBy == 'category' ? "text-white" : "text-slate-500"}`}>▴</button>
                                            <button className={`p-0 leading-none h-3 ${sortOrder == 'DESC' && sortBy == 'category' ? "text-white" : "text-slate-500"}`}>▾</button>
                                        </div>
                                    </div>
                                </th>
                                <th className="border border-slate-500 p-1">
                                    <div className="flex justify-center cursor-pointer" onClick={() => {
                                        setSortBy("createdAt");
                                        setSortOrder(sortOrder == "ASC" ? "DESC" : "ASC");
                                    }}>
                                        Date Time
                                        <div className="p-0 inline-flex flex-col">
                                            <button className={`p-0 leading-none h-3 ${sortOrder == 'ASC' && sortBy == 'createdAt' ? "text-white" : "text-slate-500"}`}>▴</button>
                                            <button className={`p-0 leading-none h-3 ${sortOrder == 'DESC' && sortBy == 'createdAt' ? "text-white" : "text-slate-500"}`}>▾</button>
                                        </div>
                                    </div>
                                </th>
                                <th className="border border-slate-500 p-1">
                                    <div className="flex justify-center cursor-pointer">
                                        Action 
                                        {/* <div className="p-0 inline-flex flex-col">
                                            <button className="text-gray-400 p-0 leading-none h-3">▴</button>
                                            <button className="text-gray-400 p-0 leading-none h-3">▾</button>
                                        </div> */}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length ? (
                                data.map((item) => (
                                    <CreateRow 
                                        key = {item._id} 
                                        detail = {item} 
                                        deleteData = {deleteData} 
                                        setModalOpen = {setIsModalOpen} 
                                        setUpdatingData = {setUpdatingData}
                                        setUpdatingId = {setUpdatingId}
                                    ></CreateRow>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-2">No Data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="w-full p-2 mt-2 flex justify-between">
                        <div>
                            <span className="text-xs">{Number(entriesPP) * (page - 1) + 1} to {totalRecords / Number(entriesPP) >= page ? Number(entriesPP) * page : totalRecords} (out of {totalRecords} records)</span>
                        </div>
                        <div>
                            <button className="border border-white px-4 text-white cursor-pointer disabled:text-gray-500 disabled:cursor-auto" disabled = {page == 1} onClick={() => setPage(page - 1)}>≪</button>
                            <button className="border border-white px-4 text-white cursor-pointer disabled:text-gray-500 disabled:cursor-auto" disabled = {page == 1} onClick={() => setPage(page - 1)}>≺</button>
                            <span className="px-2">{page}</span>
                            <button className="border border-white px-4 text-white cursor-pointer disabled:text-gray-500 disabled:cursor-auto" disabled = {totalRecords / Number(entriesPP) <= page || entriesPP == "all"} onClick={() => setPage(page + 1)}>≻</button>
                            <button className="border border-white px-4 text-white cursor-pointer disabled:text-gray-500 disabled:cursor-auto" disabled = {Math.ceil(totalRecords / Number(entriesPP)) <= page || entriesPP == "all"} onClick={() => setPage(page + 1)}>≫</button>
                        </div>
                    </div>
                </div>
                {isModalOpen && <UpdateModal data = {updatingData} setModalOpen = {setIsModalOpen} updateData = {updateData} response = {updateResponse} setResponse = {setUpdateResponse}/>}
            </div>
        </>
    )
}

type CreateRowProps = {
    detail: StoredExpense,
    deleteData: (id: string) => void,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setUpdatingData: React.Dispatch<React.SetStateAction<NewExpense>>,
    setUpdatingId: React.Dispatch<React.SetStateAction<string>>
}
function CreateRow({detail, deleteData, setModalOpen, setUpdatingData, setUpdatingId}: CreateRowProps){

    let date = null;
    if(detail.createdAt){
        date = new Date(detail.createdAt).toLocaleString();
    }

    return (
        <>
            <tr className="text-slate-200 bg-slate-800">
                <td className="border border-slate-500 p-1 text-center">{detail.expense}</td>
                <td className="border border-slate-500 p-1 text-center">₹{detail.amount}</td>
                <td className="border border-slate-500 p-1 text-center">{detail.category}</td>
                <td className="border border-slate-500 p-1 text-center">{date ?? "..."}</td>
                <td className="border border-slate-500 p-1 text-center">
                    <button className="px-1 text-blue-500 hover:text-blue-600 cursor-pointer" onClick={() => {
                        setModalOpen(true);
                        setUpdatingData({expense: detail.expense, amount: detail.amount, category: detail.category});
                        setUpdatingId(detail._id);
                    }}>Edit</button>
                    | 
                    <button className="px-1 text-red-500 hover:text-red-600 cursor-pointer" onClick={() => deleteData(detail._id)}>Delete</button>
                </td>
            </tr>
        </>
    )
}

type UpdateModalProps = {
    data: NewExpense,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateData: (data: {expense?: string, amount?: number, category?: string}) => void,
    response: {success: boolean, msg: string},
    setResponse: React.Dispatch<React.SetStateAction<{success: boolean, msg: string}>>
}
function UpdateModal({data, setModalOpen, updateData, response, setResponse}: UpdateModalProps){
    let [expense, setExpense] = useState(data.expense);
    let [amount, setAmount] = useState(data.amount);
    let [category, setCategory] = useState(data.category);
    let [invalidField, setInvalidField] = useState({expense: false, amount: false, category: false});

    function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        let isValidData = true;

        if(expense == ""){
            setInvalidField(prev => ({...prev, expense: true}));
            isValidData = false;
        }
        if(amount == 0 || isNaN(amount)){
            setInvalidField(prev => ({...prev, amount: true}));
            isValidData = false;
        }
        if(category == ""){
            setInvalidField(prev => ({...prev, category: true}));
            isValidData = false;
        }

        console.log(category);

        let updatedData: UpdateExpense = {
            ...(expense != data.expense && {expense}),
            ...(amount != data.amount && {amount}),
            ...(category != data.category && {category})
        }

        if(Object.keys(updatedData).length <= 0 || !isValidData) return;

        updateData(updatedData);
    }
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
                <div className="text-end">
                    <button className="cursor-pointer" onClick={() => {
                        setModalOpen(false);
                        setResponse({success: false, msg: ""});
                    }}>
                        <FaXmark/>
                    </button>
                </div>
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <div className="">
                        <input type="text" className="w-full border border-slate-700 rounded-md px-1 py-2 text-sm outline-0 bg-slate-800" placeholder="*Expense" value={expense} onChange={(e) => {
                            setExpense(e.target.value);
                            setInvalidField({...invalidField, expense: false});
                        }}/>
                        {invalidField.expense && (
                            <span className="text-xs text-red-700">* Please enter valid expense </span>
                        )}
                    </div>

                    <div className="">
                        <input type="number" className="w-full border border-slate-700 rounded-md px-1 py-2 text-sm outline-0 bg-slate-800" placeholder="*Amount" value={amount} onChange={(e) => {
                            setAmount(Number(e.target.value));
                            setInvalidField({...invalidField, amount: false});
                        }}/>
                        {invalidField.amount && (
                            <span className="text-xs text-red-700">* Please enter valid amount </span>
                        )}
                    </div>

                    <div className="">
                        <select className="w-full border border-slate-700 rounded-md px-1 py-2 text-sm outline-0 bg-slate-800"  value={category} onChange={(e) => {
                            setCategory(e.target.value);
                            setInvalidField({...invalidField, category: false});
                        }}>
                            <option value="shopping">Shopping</option>
                            <option value="food">Food</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="travel">Travel</option>
                            <option value="other">Other</option>
                        </select>
                        {invalidField.category && (
                            <span className="text-xs text-red-700">* Please select a category </span>
                        )}
                    </div>

                    {response.msg && (
                        <span className={`text-xs ps-1 ${response.success ? 'text-green-700' : 'text-red-700'}`}>* {response.msg}</span>
                    )}

                    <div className="text-center">
                        <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}