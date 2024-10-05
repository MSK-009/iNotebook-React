const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = "MY_SECRET_KEY"

// ROUTE 1: Create a user using: POST "api/auth/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password').isLength({ min: 3 })
], async (req, res) => {
    let success = false

    // Check if errors exists
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        // Checks if user with given email exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "A user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        let secPass = await bcrypt.hash(req.body.password, salt)
        // Creates a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send( success, "An error occured")
    }
});

// ROUTE 2: Authenticate a user using: POST "api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can\'t be blank').exists(),
], async (req, res) => {
    let success = false;
    
    // Check if errors exists
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error occured")
    }
})

// ROUTE 3: Get loggedin user details: POST "api/auth/getuser". Login required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error occured")
    }
})


module.exports = router