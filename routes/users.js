const express = require("express");
const { saveUser, findUserByEmail } = require("../database/users");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req,res)=>{ //post cadastrar
    try {
        const isEmailAlreadyUsed = await findUserByEmail(req.body.email) //verifica se email ja existe
        if(isEmailAlreadyUsed) return res.status(400).json({
            message : "Email already i being used", //se tiver email devolve essa mensagem
        })
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
        const savedUser = await saveUser(user);
        delete savedUser.password; // esse delete escode a senha criptografada de aparecer para usuario
        res.status(201).json({
        user: savedUser
    })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }  
});



module.exports = {
    router
};