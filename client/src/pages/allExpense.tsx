import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenseApi";
import type { expense, expenseCateogry, entriesPP } from "../types/types";

export default function AllExpenses(){
    let [data, setData] = useState<expense[] | null>(null);
    let [sortBy, setSortBy] = useState<"expense" | "amount" | "category" | "createdAt">("createdAt");
    let [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
    let [search, setSearch] = useState("");
    let [filter, setFiler] = useState<expenseCateogry>("all");
    let [entriesPP, setEntriesPP] = useState<entriesPP>("5");
    let [totalRecords, setTotalRecords] = useState(0);
    let [page, setPage] = useState(1);

    async function getData(){
        try{
            let data = await getExpenses(sortBy, sortOrder, search, filter, entriesPP, page);

            if(data){
                setTotalRecords(data.totalRecords);
                setData(data.data);
            }
            
        }catch(err){
            console.log(err);
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

    return(
        <>
            <div className="p-4 pt-16">
                <h2 className="mb-2 text-white">All Expenses</h2>
                <div className="w-full rounded border border-slate-700 bg-slate-900 p-4">
                    <div className="w-full p-2 mb-4 flex justify-between">
                        <div className="flex items-center gap-6">
                            <label htmlFor="CategorySort" className="text-white">Category: </label>
                            <select id="CategorySort" className="text-white outline-0 focus:bg-slate-900 border border-slate-700 p-1 rounded-md" value={filter} onChange={(e) => setFiler(e.target.value as expenseCateogry)}>
                                <option value="all">All</option>
                                <option value="shopping">Shopping</option>
                                <option value="food">Food</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="travel">Travel</option>
                                <option value="other">Other</option>
                            </select>

                            <label htmlFor="entries" className="text-white">Entries: </label>
                            <select id="entries" className="text-white outline-0 focus:bg-slate-900 border border-slate-700 rounded-md px-2 py-1" value={entriesPP} onChange={(e) => setEntriesPP(e.target.value as entriesPP)}>
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
                                    <CreateRow key = {item._id} detail = {item}></CreateRow>
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
            </div>
        </>
    )
}


function CreateRow({detail}: {detail: expense}){

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
                    <button className="px-1 text-blue-500 hover:text-blue-600 cursor-pointer">Edit</button>
                    | 
                    <button className="px-1 text-red-500 hover:text-red-600 cursor-pointer">Delete</button>
                </td>
            </tr>
        </>
    )
}