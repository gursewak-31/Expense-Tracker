import { ObjectId, type Collection, type Db } from "mongodb";
import { connectDB } from "./dbConn.js";
import type { NewUser, UpdateUser, StoredUser } from "../types/types.js";

export async function insertUser(data: NewUser){
    let db = await connectDB();

    let users = db.collection("users");
    let result = await users.insertOne({...data, createdAt: new Date()});

    return result.insertedId;
}

export async function checkUser(userEmail: string){
    let db = await connectDB();

    let users = db.collection("users");
    let result = await users.findOne<{_id: ObjectId, password: string}>({email: userEmail}, {projection: {_id: 1, password: 1}});

    return result;
}

export async function getUser(userId: string){
    let db = await connectDB();

    let UID = new ObjectId(userId);
    let users = db.collection("users");
    let result = await users.findOne<StoredUser>({_id: UID}, {projection: {password: 0}});

    return result;
}

export async function getPassword(userId: string){
    let db = await connectDB();

    let UID = new ObjectId(userId);
    let users = db.collection("users");
    let result = await users.findOne<{password: string}>({_id: UID}, {projection: {password: 1}})

    return result;
}

export async function updateImage(image: string | undefined, userId: string){
    let db = await connectDB();

    let UID = new ObjectId(userId);
    let users = db.collection("users");
    if(image)
       var result = await users.updateOne({_id: UID}, {$set: {profileImage: image}});
    else 
       var result = await users.updateOne({_id: UID}, {$unset: {profileImage: ""}});

    return result.acknowledged;
}

export async function updateUser(data: UpdateUser, userId: string){
    let db = await connectDB();

    let UID = new ObjectId(userId);
    let updateData: UpdateUser = {
        ...(data.firstName !== undefined && {"firstName": data.firstName}),
        ...(data.lastName !== undefined && {"lastName": data.lastName}),
        ...(data.email !== undefined && {"email": data.email})
    };
    let users = db.collection("users");
    let result = await users.updateOne({_id: UID}, {$set: updateData});

    return result.acknowledged;
}

export async function updatePassword(newPassword: string, userId: string){
    let db = await connectDB();

    let UID = new ObjectId(userId);
    let users = db.collection("users");
    let result = await users.updateOne({_id: UID}, {$set: {password: newPassword}});

    return result.acknowledged;
}

export async function deleteUser(userId: string){
    let db = await connectDB();

    let UID = new ObjectId(userId);
    let users = db.collection("users");
    let result = await users.deleteOne({_id: UID});

    let expenses = db.collection("expenses");
    await expenses.deleteMany({user_id: userId});

    return result.deletedCount;
}