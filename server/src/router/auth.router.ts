import express from "express";
import multer from "multer";
import path from "path";
import { mkdir } from "fs/promises";
import * as authController from "../controller/auth.controller.js";

const router = express.Router();

let uploadsPath = path.join(import.meta.dirname, "../../../uploads");
await mkdir(uploadsPath, { recursive: true });

let allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];
const uploads = multer({
    dest: uploadsPath,

    limits: {
        fieldSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        if(allowedFileTypes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Wrong file type."));
        }
    }
});

router.post("/login", (req, res, next) => {
    authController.login(req, res, next);
});

router.post("/signup", uploads.single("profileImage"), (req, res, next) => {
    req.body = {...req.body, profileImage: req.file?.filename};
    authController.signup(req, res, next);
});

router.get("/user", (req, res, next) => {
    authController.user(req, res, next);
});

router.post("/updateProfileImage", uploads.single("profileImage"), (req, res, next) => {
    req.body = {...req.body, profileImage: req.file?.filename};
    authController.updateProfileImage(req, res, next);
});

router.post("/updateData", (req, res, next) => {
    authController.updateData(req, res, next);
});

router.post("/updatePassword", (req, res, next) => {
    authController.updatePassword(req, res, next);
});

router.get("/logout", (req, res, next) => {
    authController.logout(req, res, next);
});

router.get("/deactivate", (req, res, next) => {
    authController.deleteUser(req, res, next); 
});

export default router;