const express = require('express');
const router = express.Router();
const { userRegister, login, userAuth } = require("../utils/Auth");

/* //STUDENT REGISTER ROUTE
router.post("/register-student", async (req,res) =>{

    await userRegister(req.body, 'STUDENT', res);

})

//PARENT REGISTER ROUTE
router.post("/register-parent", async (req,res) =>{

    await userRegister(req.body, 'PARENT', res);

})

//TEACHER REGISTER ROUTE
router.post("/register-teacher", async (req,res) =>{

    await userRegister(req.body, 'TEACHER', res);

}) */

//ADMIN LOGIN ROUTE
router.post("/login-admin", async (req,res) =>{
    await login(req.body, 'ADMIN', res);
})

//STUDENT LOGIN ROUTE
router.post("/login-student", async (req,res) =>{
    await login(req.body, 'STUDENT', res);
})

//TEACHER LOGIN ROUTE
router.post("/login-teacher", async (req,res) =>{
    await login(req.body, 'TEACHER', res);
})

///PARENT LOGIN ROUTE
router.post("/login-parent", async (req,res) =>{
    await login(req.body, 'PARENT', res);
})


//ACCESS ADMIN ROUTES


router.get("/profile", userAuth, async (req,res)=>{
    console.log(req.user)
})


module.exports = router;