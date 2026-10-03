import express from "express";
import multer from "multer";
import path from "path";
import { mkdir } from "fs/promises";
import * as authController from "../controller/auth.controller.js";
import AppError from "../errors/appError.js";

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
            cb(new AppError(422, "Wrong file type."));
        }
    }
});

router.post("/login", authController.login);

router.post("/signup", uploads.single("profileImage"), (req, res, next) => {
    req.body = {...req.body, profileImage: req.file?.filename};
    authController.signup(req, res, next);
});

router.get("/user", authController.user);

router.post("/updateProfileImage", uploads.single("profileImage"), (req, res, next) => {
    req.body = {...req.body, profileImage: req.file?.filename};
    authController.updateProfileImage(req, res, next);
});

router.post("/updateData", authController.updateData);

router.post("/updatePassword", authController.updatePassword);

router.get("/logout", authController.logout);

router.get("/deactivate", authController.deleteUser);

export default router;