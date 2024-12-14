import mongoose from "mongoose";
import userSchema, { getAuthontication } from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const User = userSchema

export const userRegister = async (req, res) => {
    try {
        const { name, email, password, image } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            imageUrl: image,
        });

        const token = await getAuthontication(newUser);
        res.status(201).send({ message: "Registration successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Server Error: ${err.message}`);
    }
};

export const userProfile = async (req, res) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            console.log("object")
            return res.status(403).send("Invalid Token");
        }

        jwt.verify(token, "uber-Clone", (err, decoded) => {
            if (err) {
                return res.status(403).send("Invalid Token");
            }
            res.status(200).send({ status: true, data: decoded });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Server Error: ${err.message}`);
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).send("Invalid email or password");
        }

        const token = await getAuthontication(user);
        res.cookie("token", token);
        res.send("Login successful", token);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Server Error: ${err.message}`);
    }
};

export const userLogout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).send("Logged Out");
    } catch (err) {
        console.error(err);
        res.status(500).send(`Something went wrong: ${err.message}`);
    }
};
