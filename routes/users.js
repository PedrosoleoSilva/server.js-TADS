const express = require("express");
const { saveUser, findUserByEmail, findUserById } = require("../database/users");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");//importa a biblioteca
const auth = require("../middlewares/auth");


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

router.post("/login", async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await findUserByEmail(email); //verifica se email esta cadastrado no banco
    if(!user) return res.status(401).send(); //nao tiver email vai aparecer erro 404
    const isSamePassword = bcrypt.compareSync(password, user.password);//compara a senha
    if(!isSamePassword) return res.status(401).send(); //verifica se a senha esta certa

    const token = jwt.sign({
        userId: user.id,
        name: user.name
    }, process.env.SECRET);
    res.json({
        success: true,
        token
    })
});

router.get("/profile", auth,  async (req,res)=>{
    const user = await findUserById(req.user.userId);
    delete user.password;
    res.json({
        user
    })
})


module.exports = {
    router
};