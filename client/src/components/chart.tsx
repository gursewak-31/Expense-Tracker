import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { ChartData } from "../types/types";

export function ExpenseCategoryChart({categoryExpense}: {categoryExpense: ChartData[] | []}){
    return(
        <ResponsiveContainer height={350}>
            <PieChart>
                <Pie data={categoryExpense} dataKey={"total"} nameKey={"_id"} innerRadius={"60%"} cx={"50%"} cy={"50%"} label>
                    <Cell fill="#740A03"/>
                    <Cell fill="#132440"/>
                    <Cell fill="#44444E"/>
                    <Cell fill="#234C6A"/>
                </Pie>
                <Legend/>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export function DayWiseDataChart({ dayWiseExpense }: {dayWiseExpense: ChartData[] | []}){

    let dayWiseData = []; // new data for last 10 day's 
    let currDate = new Date(); // get today's date
    let i = 9;
    while(i >= 0){ // collect last 10 day's data in array
        let newDate = new Date(currDate);
        newDate.setDate(currDate.getDate() - i); // new date like 0 day before, 1 day before etc.

        let _id = newDate.toISOString().slice(0, 10);
        let found = dayWiseExpense.find(obj => obj._id == _id); // if dayWiseExpense has any object with same date (last 10 dates)

        dayWiseData.push({_id: newDate.toISOString().slice(0, 10), total: found?.total ?? 0});
        i--;
    }

    return(
        <ResponsiveContainer height={350}>
            <LineChart data={dayWiseData}>
                {/* <CartesianGrid/> */}
                <XAxis dataKey={"_id"}/>
                <YAxis/>
                <Tooltip/>
                <Line type={"monotone"} dataKey={"total"}/>
            </LineChart>
        </ResponsiveContainer>
    )
}