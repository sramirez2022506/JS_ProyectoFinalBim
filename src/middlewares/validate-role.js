export const hasRole = (req, res, next) =>{
    if(!req.user){
        return res.status(500).json({
            msg: "Cannot validate token"
        });
    }

    const {role, name} = req.user;

    if(role !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${name} is not an admin, so he cannot use this endpoint`
        });
    }
    next();
};

export const validRole = (req, res, next) =>{
    console.log(req.body);
    const validRole = ["ADMIN_ROLE", "CLIENT_ROLE"];
    const {role} = req.body;
    if(!validRole.includes(role)){
        return res.status(400).json({
            msg: "Role not valid"
        });
    }
    next();
}