import jwt from "jsonwebtoken";
import User from "../users/user.model.js";

export const validateJWT = async (req = response, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "Missing token"
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: "The user doesnt exist"
            });
        }
        if (!user.status) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.stauts(401).json({
            msf: "Invalid token"
        });
    }
};