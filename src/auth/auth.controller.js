import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
    const { userOrEmail, password } = req.body;

    try {
        const user = await UserActivation.findOne({
            $or: [{ email: userOrEmail }, { username: userOrEmail }]
        });

        if (!user) {
            return res.status(400).json({
                msg: "Incorrect credentials"
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "The username doesnt exist"
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Incorrect credentials"
            });
        }

        const token = await generateJWT(user.id);

        res.status(200).json({
            msg: "Welcome!!!",
            username: user.username,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Please communicate with the admin"
        });
    }
};