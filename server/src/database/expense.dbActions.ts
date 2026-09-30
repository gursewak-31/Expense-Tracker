import { ObjectId, type Collection, type Db } from "mongodb";
import { connectDB } from "./dbConn.js";
import type { NewUser, NewExpense, ExpenseReqQuery, UpdateExpense } from "../types/types.js";
import type { Sort } from "mongodb";

export async function insertExpense(data: NewExpense){
    let db = await connectDB();
    let result = null;

    if(db){
        let expenses = db.collection("expenses");
        result = await expenses.insertOne({...data, createdAt: new Date()});
    }

    return result ? result.insertedId : result;
}

export async function getExpense(data: ExpenseReqQuery, userId: string){
    let db = await connectDB();
    let result = null;
    let recordsTotal = 0;

    if(db){
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
                recordsTotal = await expenses.countDocuments({
                    user_id: UID,
                    $or: [
                        {expense: {$regex: searchQuery, $options: "i"}},
                        {category: {$regex: searchQuery, $options: "i"}}
                    ]
                });
                result = await expenses.find({
                    user_id: UID,
                    $or: [
                        {expense: {$regex: searchQuery, $options: "i"}},
                        {category: {$regex: searchQuery, $options: "i"}}
                    ]
                }).sort({[sortBy]: sortOrder} as Sort).skip(skip).limit(entries).toArray();
            }else{
                recordsTotal = await expenses.countDocuments({user_id: UID});
                result = await expenses.find({user_id: UID}).sort({[sortBy]: sortOrder} as Sort).skip(skip).limit(entries).toArray();
            }
        }else{
            if(searchQuery != ''){
                recordsTotal = await expenses.countDocuments({
                    user_id: UID,
                    $or: [
                        {expense: {$regex: searchQuery, $options: "i"}},
                        {amount: {$regex: searchQuery, $options: "i"}},
                        {category: {$regex: searchQuery, $options: "i"}},
                        {createdAt: {$regex: searchQuery, $options: "i"}}
                    ],
                    category: category
                });
                result = await expenses.find({
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
                recordsTotal = await expenses.countDocuments({user_id: UID, category: category});
                result = await expenses.find({user_id: UID, category: category}).sort({[sortBy]: sortOrder} as Sort).skip(skip).limit(entries).toArray();
            }
        }
    }

    return {data: result, totalRecords: recordsTotal};
}

export async function getData(id: string){
    let db = await connectDB();
    let result = null;

    if(db){
        let UID = id;
        let expenses = db.collection("expenses");
        let dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - 9);
        dateFrom.setHours(0, 0, 0, 0); // set time to mid night to so it consider all day
        result = await expenses.aggregate([
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
    }

    return result;
}

export async function updateExpense(data: UpdateExpense){
    let db = await connectDB();
    let result = null;

    if(db){
        let ExpenseID = new ObjectId(data.id);
        let updateData = {
            ...(data.expense !== undefined && {"expense": data.expense}),
            ...(data.amount !== undefined && {"amount": data.amount}),
            ...(data.category !== undefined && {"category": data.category})
        }
        let expenses = db.collection("expenses");

        result = await expenses.updateOne(
            {_id: ExpenseID}, 
            {$set: updateData}
        );
    }

    return result ? result.acknowledged : result;
}

export async function deleteExpense(id: string){
    let db = await connectDB();
    let result = null;
    
    if(db){
        let ExpenseID = new ObjectId(id);
        let expenses = db.collection("expenses");
        
        result = await expenses.deleteOne({_id: ExpenseID});
    }
    
    return result ? result.acknowledged : result;
}