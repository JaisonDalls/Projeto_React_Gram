const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

//Generate user token 
const generateToken = (id) => {
    return jwt.sign({id},jwtSecret, {
        expiresIn: "7d"
    });
};

//Register user and sign in
const register = async (req, res) => {
    const {name, email, password} = req.body;

    //check if user exists
    const user = await User.findOne({email});
    if(user){
        res.status(422).json({errors: ["Já existe este e-mail cadastrado em nosso sistema!"]});
        return;
    }

    //Generate password hash
    const passwordHash = await generateHashPassword(password);

    //Create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });

    //Check if user was created succesfully, return token
    if(!newUser){
        res.status(422).json({errors: ["Não foi possível cadastrar usuário!"]});
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    });
}

//Sign user in 
const login = async (req, res) => {
    const {email, password} = req.body;

    //check if user exists
    const user = await User.findOne({email});
    
    //Check is user exists
    if(!user){
        res.status(404).json({errors: ["Usuário não está cadastrado no sistema!"]});
        return;
    }

    //Check if password matches
    if(!await bcrypt.compare(password, user.password)){
        res.status(404).json({errors: ["A senha inserida é inválida!"]});
        return;
    }

    //Return user with token
    res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    });
}

//Get current logged in user 
const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json({
        user
    });
}

const update = async (req, res) => {
    const {name, password, bio} = req.body;
    const user = await User.findById(req.user._id).select("-password");

    let profileImage = null;

    if(req.file) profileImage = req.file.filename;
    if(name) user.name = name;
    if(password) await generateHashPassword(password);
    if(bio) user.bio = bio;   
    if(profileImage) user.profileImage = profileImage; 

    await user.save();

    res.status(200).json(user);
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update
};

async function generateHashPassword(password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}
