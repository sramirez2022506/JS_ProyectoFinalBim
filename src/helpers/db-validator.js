import User from "../users/user.model.js";

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

export const existUser = async (name = "") =>{
    const existUser = await User.finOne({name});
    if(existUser){
        throw new Error(`The user ${name} alredy exists`);
    }
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
