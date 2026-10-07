import { ObjectId, type Collection, type Db } from "mongodb";
import { connectDB } from "./dbConn.js";
import type { NewExpense, ExpenseReqQuery, UpdateExpense, StoredExpense } from "../types/types.js";
import type { Sort } from "mongodb";

export async function insertExpense(data: NewExpense){
    let db = await connectDB();

    let expenses = db.collection("expenses");
    let result = await expenses.insertOne({...data, createdAt: new Date()});

    return result.insertedId;
}

export async function getExpense(data: ExpenseReqQuery, userId: string){
    let db = await connectDB();

    let UID = userId;
    let sortBy = data.sort;
    let sortOrder = data.order == "ASC" ? 1 : -1;
    let category = data.filter;
    let searchQuery = data.search;
    let entries = Number(data.record);
    let page = Number(data.page);
    let skip = entries * (page - 1);
    let expenses = db.collection("expenses");
    if(category == 'all'){
        if(searchQuery != ''){
            var recordsTotal = await expenses.countDocuments({
                user_id: UID,
                $or: [
                    {expense: {$regex: searchQuery, $options: "i"}},
                    {category: {$regex: searchQuery, $options: "i"}}
                ]
            });
            var result = await expenses.find<StoredExpense>({
                user_id: UID,
                $or: [
                    {expense: {$regex: searchQuery, $options: "i"}},
                    {category: {$regex: searchQuery, $options: "i"}}
                ]
            }).sort({[sortBy]: sortOrder} as Sort).skip(skip).limit(entries).toArray();
        }else{
            var recordsTotal = await expenses.countDocuments({user_id: UID});
            var result = await expenses.find<StoredExpense>({user_id: UID}).sort({[sortBy]: sortOrder} as Sort).skip(skip).limit(entries).toArray();
        }
    }else{
        if(searchQuery != ''){
            var recordsTotal = await expenses.countDocuments({
                user_id: UID,
                $or: [
                    {expense: {$regex: searchQuery, $options: "i"}},
                    {amount: {$regex: searchQuery, $options: "i"}},
                    {category: {$regex: searchQuery, $options: "i"}},
                    {createdAt: {$regex: searchQuery, $options: "i"}}
                ],
                category: category
            });
            var result = await expenses.find<StoredExpense>({
                user_id: UID,
                $or: [
                    {expense: {$regex: searchQuery, $options: "i"}},
                    {amount: {$regex: searchQuery, $options: "i"}},
                    {category: {$regex: searchQuery, $options: "i"}},
                    {createdAt: {$regex: searchQuery, $options: "i"}}
                ],
                category: category
            }).sort({[sortBy]: sortOrder} as Sort).skip(skip).limit(entries).toArray();
        }else{
            var recordsTotal = await expenses.countDocuments({user_id: UID, category: category});
            var result = await expenses.find<StoredExpense>({user_id: UID, category: category}).sort({[sortBy]: sortOrder} as Sort).skip(skip).limit(entries).toArray();
        }
    }

    return {data: result, totalRecords: recordsTotal};
}

export async function getData(id: string){
    let db = await connectDB();

    let UID = id;
    let expenses = db.collection("expenses");
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 9);
    dateFrom.setHours(0, 0, 0, 0); // set time to mid night to so it consider all day
    let result = await expenses.aggregate([
        {
            $match: {
                user_id: UID,
                createdAt: {$ne: null, $gte: dateFrom}
            }
        },
        {
            $facet: {
                grandTotal: [
                    {
                        $group: {
                            _id: null,
                            total: {$sum: "$amount"}
                        }
                    }
                ],
                categoryTotal: [
                    {
                        $group: {
                            _id: "$category",
                            total: {$sum: "$amount"}
                        }
                    }
                ],
                dayWiseTotal: [
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$createdAt"
                                }
                            },
                            total: {$sum: "$amount"},
                        }
                    },
                    {
                        $sort: {_id: 1}
                    }
                ]
            }
        }
    ]).toArray();

    return result;
}

export async function updateExpense(data: UpdateExpense){
    let db = await connectDB();

    let ExpenseID = new ObjectId(data.id);
    let updateData = {
        ...(data.expense !== undefined && {"expense": data.expense}),
        ...(data.amount !== undefined && {"amount": data.amount}),
        ...(data.category !== undefined && {"category": data.category})
    }
    let expenses = db.collection("expenses");

    let result = await expenses.updateOne(
        {_id: ExpenseID}, 
        {$set: updateData}
    );

    return result.acknowledged;
}

export async function deleteExpense(id: string){
    let db = await connectDB();
    
    let ExpenseID = new ObjectId(id);
    let expenses = db.collection("expenses");
    
    let result = await expenses.deleteOne({_id: ExpenseID});
    
    return result.acknowledged;
}