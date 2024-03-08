import Role from "../role/role.model.js";
import User from "../user/user.model.js";

export const validRole = async (role = '') =>{
    const existRole = await Role.findOne({role});

    if(!existRole){
        throw new Error(`The role ${role} doesnt exists in the database`);
    }
}

export const existEmail = async (email = '')=>{
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} alredy exists`);
    }
}

export const existUserById = async (id= '') =>{
    const existsUser = await User.findById(id);
    if(!existsUser){
        throw new Error(`The id ${id} doesnt exists`);
    }
}