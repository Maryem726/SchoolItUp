const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv/config')


//REGISTER FUNCTION
const userRegister = async (userDets, role, res) => {
    try {
        let firstAndLastNotTaken = await validateFirstAndLast(userDets.first_name, userDets.last_name);
        let emailNotRegistered = await validateEmail(userDets.mail);
        //console.log(userDets.first_name);
        if (!firstAndLastNotTaken) {
            return res.status(400).json({
                message: "NAME ALREADY TAKEN",
                success: false
            });
        }

        /* if (!emailNotRegistered) {
            return res.status(400).json({
                message: "EMAIL ALREADY IN USE",
                success: false
            });
        } */

        const salt = bcrypt.genSaltSync(10);
        const hashed = await bcrypt.hashSync(userDets.pass, salt);



        const newUser = new User({
            ...userDets,
            pass: hashed,
            role: role
        });
        await newUser.save();
        return res.status(201).json({
            message: "USER ADDED",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ADD USER",
            reason: error.toString(),
            success: false
        });
    }


};


//LOG IN FUNCTION
const login = async (userCreds, role, res) => {
    let { first_name, last_name, pass } = userCreds;
    const user = await User.findOne({
        first_name: first_name,
        last_name: last_name
    });
    if (!user) {
        return res.status(404).json({
            message: "User Not Found",
            success: false
        })
    }
    if (user.role != role) {
        return res.status(403).json({
            message: "User doesn't match specifications",
            success: false
        })
    }

    let isMatch = await bcrypt.compare(pass, user.pass);
    if (isMatch) {
        let token = jwt.sign({
            userId: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,

        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "2 days"
            }
        );
        let result = {
            first_name: user.first_name,
            last_name: user.last_name,
            id: user._id,
            role: user.role,
            token: `Bearer ${token}`,
            expiresIn: 168
        }
        return res.status(200).json({
            ...result,
            message: "Successfuly logged in",
            success: true
        })
    } else {
        return res.status(403).json({
            message: "Incorrect Password",
            success: false
        })
    }

}


//FUNCTION TO VERIFY EXISTENCE OF USER WITH SAME FIRST AND LAST NAME
const validateFirstAndLast = async (first, last) => {
    let user = await User.findOne({
        first_name: first,
        last_name: last
    });
    return user ? false : true;
}

//PASSPORT MIDDLEWARE
const userAuth = ()=>{
    return passport.authenticate("jwt", { session: false });
}

//FUNCTION TO VERIFY EXISTENCE OF USER WITH SAME EMAIL
const validateEmail = async email => {
    let user = await User.findOne({
        email: email
    });
    return user ? false : true;
}




module.exports = {
    userAuth,
    userRegister,
    login
}