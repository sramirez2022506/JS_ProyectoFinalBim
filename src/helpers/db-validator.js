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

export const emailValid = async (email = "") =>{
    const emailValid = await User.findOne({email});
    return !!emailValid
};

export const existUserById = async (id= '') =>{
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`The id ${id} doesnt exists`);
    }
}

export const nameValid = async (name = "") =>{
    const nameValid = await User.findOne({name});
    return !!nameValid; 
};
