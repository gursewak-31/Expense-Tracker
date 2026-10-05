import { useEffect, useState } from "react";
import { addExpense } from "../api/expenseApi";

export default function AddExpense(){
    let [expense, setExpense] = useState("");
    let [amount, setAmount] = useState<number>(0);
    let [category, setCatagory] = useState("");
    let [response, setResponse] = useState({success: true, msg: ""});
    let [invalidField, setInvalidField] = useState({expense: false, amount: false, category: false});

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        let isValid = true;

        if(expense == ""){
            setInvalidField(prev => ({...prev, expense: true}));
            isValid = false;
        }
        if(isNaN(amount) || amount == 0){
            setInvalidField(prev => ({...prev, amount: true}));
            isValid = false;
        }
        if(category == ""){
            setInvalidField(prev => ({...prev, category: true}));
            isValid = false;
        }

        if(!isValid) return;

        let data = {expense: expense, amount: amount, category: category};
        let res = await addExpense(data);

        if(res.success){
            setExpense("");
            setAmount(0);
            setCatagory("");
        }

        setResponse({success: res.success, msg: res.msg});
    }

    useEffect(() => {
        if(response.msg) setTimeout(() => setResponse({success: true, msg: ""}), 3000);
    }, [response]);

    return(
        <>
            <div className="p-4 pt-16 flex-1 flex flex-col items-center">
                <h2 className="mb-2 text-white">Add Expense</h2>
                <div className="md:w-1/2 w-full rounded-md border border-slate-700 bg-slate-900 p-4">
                    <form className="flex h-full flex-col" onSubmit={submit}>
                        <div className="w-full p-2">
                            <input type="text" className="w-full text-white outline-0 px-1 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm" placeholder="Enter Expense" value={expense} onChange={(e) => {
                                setExpense(e.target.value);
                                setInvalidField({...invalidField, expense: false});
                            }}/>
                            {invalidField.expense && (
                                <span className="text-xs text-red-700">* Please enter valid expense</span>
                            )}
                        </div>

                        <div className="w-full p-2">
                            <input type="number" className="w-full text-white outline-0 px-1 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm" placeholder="Enter Amount" value={amount} onChange={(e) => {
                                setAmount(parseInt(e.target.value));
                                setInvalidField({...invalidField, amount: false});
                            }}/>
                            {invalidField.amount && (
                                <span className="text-xs text-red-700">* Please enter valid amount</span>
                            )}
                        </div>

                        <div className="w-full p-2">
                            <select id="category" className="w-full text-white outline-0 px-1 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm" value={category} onChange={(e) => {
                                setCatagory(e.target.value);
                                setInvalidField({...invalidField, category: false});
                            }}>
                                <option value="" selected disabled>--- Category ---</option>
                                <option value="shopping">Shopping</option>
                                <option value="food">Food</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="travel">Travel</option>
                                <option value="other">Other</option>
                            </select>
                            {invalidField.category && (
                                <span className="text-xs text-red-700">* Please selete category</span>
                            )}
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