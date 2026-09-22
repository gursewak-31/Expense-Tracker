import { useEffect, useState } from "react";
import { addExpense } from "../api/expenseApi";

export default function AddExpense(){
    let [expense, setExpense] = useState("");
    let [amount, setAmount] = useState<number | "">("");
    let [category, setCatagory] = useState("");
    let [response, setResponse] = useState({success: true, msg: ""});

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!expense || !amount || !category) return;

        let res = await addExpense(expense, amount, category);

        if(res.success){
            setExpense("");
            setAmount("");
            setCatagory("");
        }

        setResponse({success: res.success, msg: res.msg});
    }

    useEffect(() => {
        if(response.msg) setTimeout(() => setResponse({success: true, msg: ""}), 3000);
    }, [response])

    return(
        <>
            <div className="p-4 pt-16 flex-1 flex flex-col items-center">
                <h2 className="mb-2 text-white">Add Expense</h2>
                <div className="w-1/2 rounded border border-slate-700 bg-slate-900 p-4">
                    <form className="flex h-full flex-col" onSubmit={submit}>
                        <div className="w-full p-2">
                            <input type="text" className="w-full border-b text-white outline-0 p-1" placeholder="Enter Expense" value={expense} onChange={(e) => setExpense(e.target.value)}/>
                        </div>

                        <div className="w-full p-2">
                            <input type="number" className="w-full border-b text-white outline-0 p-1" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/>
                        </div>

                        <div className="w-full p-2">
                            <label htmlFor="category" className="text-white">Category: </label>
                            <select id="category" className="border-b text-white outline-0 focus:bg-gray-900" value={category} onChange={(e) => setCatagory(e.target.value)}>
                                <option value="" selected disabled>--- Select ---</option>
                                <option value="shopping">Shopping</option>
                                <option value="food">Food</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="travel">Travel</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {response.msg && (
                            <div className="w-full px-2">
                                <span className={`text-xs ${response.success ? 'text-green-700': 'text-red-700'}`}>* {response.msg}</span>
                            </div>
                        )}

                        <div className="w-full p-2 text-center">
                            <button className="w-1/4 rounded bg-indigo-600 text-white py-1 cursor-pointer transition-colors hover:bg-indigo-700">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}