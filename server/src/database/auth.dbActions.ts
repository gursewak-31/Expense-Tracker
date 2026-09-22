import { ObjectId, type Collection, type Db } from "mongodb";
import connectDB from "./dbConn.js";
import type { NewUser } from "../types/types.js";

export async function insertUser(data: NewUser){
    let db = await connectDB();
    let result = null;

    if(db){
        let users = db.collection("users");
        result = await users.insertOne(data);
    }

    return result ? result.insertedId : result;
}

export async function checkUser(userEmail: string){
    let db = await connectDB();
    let result = null;

    if(db){
        let users = db.collection("users");
        result = await users.findOne({email: userEmail}, {projection: {_id: 1, password: 1}});
    }

    return result;
}

export async function getUser(userId: string){
    let db = await connectDB();
    let result = null;

    if(db){
        let UID = new ObjectId(userId);
        let users = db.collection("users");
        result = await users.findOne({_id: UID}, {projection: {password: 0}});
    }

    return result;
}

export async function getPassword(userId: string){
    let db = await connectDB();
    let result = null;

    if(db){
        let UID = new ObjectId(userId);
        let users = db.collection("users");
        result = await users.findOne({_id: UID}, {projection: {password: 1}})
    }

    return result;
}

export async function updateImage(image: string | undefined, userId: string){
    let db = await connectDB();
    let result = null;

    if(db){
        let UID = new ObjectId(userId);
        let users = db.collection("users");
        if(image)
            result = await users.updateOne({_id: UID}, {$set: {profileImage: image}});
        else 
            result = await users.updateOne({_id: UID}, {$unset: {profileImage: ""}});
    }

    return result ? result.modifiedCount : result;
}

export async function updateUser(data: {firstName: string, lastName?: string, email: string}, userId: string){
    let db = await connectDB();
    let result = null;

    if(db){
        let UID = new ObjectId(userId);
        let users = db.collection("users");
        if(data.lastName)
            result = await users.updateOne({_id: UID}, {$set: {firstName: data.firstName, lastName: data.lastName, email: data.email}});
        else
            result = await users.updateOne({_id: UID}, {$set: {firstName: data.firstName, email: data.email}, $unset: {lastName: ""}});
    }

    return result ? result.modifiedCount : result;
}

export async function updatePassword(newPassword: string, userId: string){
    let db = await connectDB();
    let result = null;

    if(db){
        let UID = new ObjectId(userId);
        let users = db.collection("users");
        result = await users.updateOne({_id: UID}, {$set: {password: newPassword}});
    }

    return result ? result.modifiedCount : result;
}

export async function deleteUser(userId: string){
    let db = await connectDB();
    let result = null;

    if(db){
        let UID = new ObjectId(userId);
        let users = db.collection("users");
        result = await users.deleteOne({_id: UID});

        let expenses = db.collection("expenses");
        await expenses.deleteMany({user_id: userId});
    }

    return result ? result.deletedCount : result;
}