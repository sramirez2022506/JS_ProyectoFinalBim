import {response, request} from "express";
import bcryptjs from "bcryptjs";
import User from "./user.model.js";

export  const register = async (req, res)=>{
    const {name, email, password, ...rest} = req.body;
    try{
        const salt = bcryptjs.genSaltSync();
        const hashPassword = bcryptjs.hashSync(password, salt);
        const newUser = new User({name, email, password: hashPassword});
        Object.assign(newUser, rest);
        await newUser.save();
        res.status(201).json({
            msg: "User was created succesfully",
            user: newUser
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Error in the server"
        });
    }
};

/*export const createUser = async (req, res) =>{
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}*/

export const updateUser = async (req, res) =>{
    const {id: userId} = req.params;
    const {...rest} = req.body;

    try{
        let update = {};
        if(rest.name) update.name = rest.name;
        if(rest.email) update.email = rest.email;
        if(rest.password){
            const hashPassword = await bcryptjs.hash(rest.password, 9);
            update.password = hashPassword;
        }
        update.update_at = new Date();

        const updateUser = await User.findByIdAndUpdate(userId, update, {
            new: true
        });

        return res.status(200).json({
            msg: "The user info was succesfully updated",
            user: updateUser
        });
        /*if(password){
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);*/
        }catch(e){
            console.log(e);
            res.status(500).json({
                msg: "Error in the server"
            });
        }
    };

export const updateRoleUser = async (req, res) =>{
    const {id} = req.params;
    const {role} = req.body;
    try{
        const user = await User.findById(id);
        user.Role = role;
        await user.save();
        return res
        .status(200)
        .json({
            msg: "Role changed succesfully",
            user
        }); 
    }catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Error in the server"
        });
    }
};

export const deleteUser = async (req, res) =>{
    const {id} = req.params;
    try{
        const existUser = await User.findById(userId);
        existUser.status = false;
        await existUser.save();
        res.json({
            msg: "The user was deleted succesfully"
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Error in the server"
        });
    }
}; 