import path from 'path';
import { addNewUser, validateCredentials, updateUserWithToken, findUserByEmail } from '../services/userService.mjs';
import { getToken } from '../utils/jwttoken.mjs';
import { sendEmail } from '../utils/sendEmail.mjs';

const result2 = "No such user exists!";

export const registerUserController = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide name, email, and password!" });
    }

    const user = { name, email, password };

    try {
        const result = await addNewUser(user);
        if (!result || !result.email) {
            return res.status(400).json({ message: "Unable to add the user!" });
        }

        const token_options = await getToken(result);
        const token = token_options[0];
        const options = token_options[1];
        return res.status(201).cookie('token', token, options).json({ success: true, result, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUserController = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(401).json({ 'message': "Please enter email and password both!" });
    const valid = await validateCredentials(email, password);
    if (!valid)
        return res.status(401).json({ 'message': "Please Enter valid Credentials!" });

    const token_options = await getToken(valid);
    const token = token_options[0];
    const options = token_options[1];
    return res.status(200).cookie('token', token, options).json({ success: true, valid, token });
}

export const logoutUserController = async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/"
    });
    return res.status(200).json({ success: true, message: "Logged out successfully." });
}

export const forgetPassword = async (req, res) => {
    const modifyUser = await findUserByEmail(req.body.email);
    if (modifyUser) {
        await modifyUser.getPasswordResetToken();
        const updatedUser = await updateUserWithToken(modifyUser);
        if (!updatedUser) {
            return res.status(500).json({ 'message': result2 });
        }

        let url = `${req.protocol}://${req.get("host")}/api/user/updatePassword/${updatedUser.resetPasswordToken}`;
        sendEmail(url, modifyUser.email);
        return res.status(200).json({ 'message': "Mail sent!" });
    }
    return res.status(404).json({ 'message': result2 });
}


