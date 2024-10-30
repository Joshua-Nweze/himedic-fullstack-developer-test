import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getErrorMsg from "../utils/getErrorMsg.js";

async function createAccount(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Checking if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email is already in use.' });
        }

        // hashing password
        let hashedPassword
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ msg: 'Account created successfully' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ msg: getErrorMsg(error.errors) });
        } else {
            res.status(500).json({ msg: "Something went wrong, try again later." });
        }
    }
};

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password.' });
        }

        const isPaswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPaswordCorrect) {
            return res.status(400).json({ msg: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: 2 * 24 * 60 * 60 } // 2 days
        );

        res.locals.user = user._id;
        res.status(200).json({ msg: 'Login successful', token, user: user._id });
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, try again later.' });
    }
};

export {
    createAccount,
    login
}