import { MdOutlineInfo } from 'react-icons/md';
import { dashboardData } from '../api/expenseApi';
import { useEffect, useState } from 'react';
import { ExpenseCategoryChart, DayWiseDataChart } from '../components/chart';
import type { ChartData } from "../types/types";

export default function Dashboard(){
    let [totalExpense, setTotalExpense] = useState(0);
    let [categoryExpense, setCategoryExpense] = useState<ChartData[] | []>([]);
    let [dayWiseExpense, setDayWiseExpense] = useState<ChartData[] | []>([]);

    async function getData(){
        let data = await dashboardData();

        let grandTotal = data[0].grandTotal[0]?.total;
        let categoryTotal = data[0].categoryTotal;
        let dayWiseTotal = data[0].dayWiseTotal;

        if(grandTotal && categoryTotal.length > 0 && dayWiseTotal.length > 0){
            setTotalExpense(grandTotal);
            setDayWiseExpense(dayWiseTotal);

            setCategoryExpense(categoryTotal.map((record: ChartData) => ({
                _id: record._id,
                total: Number(((100 / grandTotal) * record.total).toFixed(2))
            })));
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="p-4 pt-16 h-full">
                <div className="bg-slate-900 p-4 rounded-2xl flex gap-4">
                    <div className="border border-slate-700 p-4 rounded-md bg-slate-800">
                        <span>Total Expense: </span>
                        <span>₹ {totalExpense}</span>
                        <span className='ms-2 relative group'>
                            <MdOutlineInfo className='inline'></MdOutlineInfo>
                            <span className='text-xs absolute -right-10 top-6 border w-22 px-2 py-1 rounded bg-slate-700 transition-opacity opacity-0 group-hover:opacity-100'>Last 10 day's</span>
                        </span>
                    </div>
                </div>
                <div className="px-6 py-8 mt-5 flex gap-4 bg-slate-900 rounded-2xl">
                    <div className="w-1/3 text-sm text-center">
                        <ExpenseCategoryChart categoryExpense = {categoryExpense} />
                        <span className = "text-xs">Expense breakdown by category(in %)</span>
                    </div>

                    <div className="flex-1 text-xs text-center">
                        <DayWiseDataChart dayWiseExpense = {dayWiseExpense} />
                        <span className = "">Daily spending over the last 10 days</span>
                    </div>
                </div>
                {/* <Chart dayWiseExpense={dayWiseExpense} categoryExpense={categoryExpense}></Chart> */}
            </div>
        </>
    )
}