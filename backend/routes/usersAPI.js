/**
 * Firebase admin
 *
 * @type {*}
 */
var admin = require("../firebase");
/**
 * Firestore instance
 *
 * @type {*}
 */
const DB = admin.firestore();

let userCollection = DB.collection("users");

let statsDocument = DB.collection("data").doc("stats");

let { sessionAuthenticationAPI } = require("../authenticationMiddleware");

/**
 * Express module
 *
 * @type {*}
 */
const EXPRESS = require("express");
/**
 * Express router
 *
 * @type {*}
 */
const ROUTER = EXPRESS.Router();

/**
 * Route processing log in request
 * @name get/login
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 */
ROUTER.post("/login", async function(req, res) {
    let userDocuments = await userCollection.get();
    let loggedIn = false;
    userDocuments.forEach(doc => {
        var userData = doc.data();
        if (userData.username == req.body.username && userData.password == req.body.password) {
            loggedIn = userData.username;
        }
    });
    if (loggedIn) {
        req.session.log_in = true;
        req.session.user = loggedIn;
        req.session.save();
        res.status(200).json({status: "Logged in successfully"});
    }
    else {
        res.status(400).json({status: "Username or password are not correct. User may not exist in the system"});
    }
});

ROUTER.get("/login/check", async function(req, res) {
    if (!req.session.user) {
        res.status(401).json({status: "Please sign in"});
    }
    else {
        res.status(200).json({status: "OK"});
    }
})

/**
 * Route processing sign out request
 * @name get/signout
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 */
ROUTER.get("/signout", function(req, res) {
    req.session.destroy();
    res.status(200).json({status: "Signed out successfully"})
});

/**
 * Route adding new user
 * @name post/signup
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 */
ROUTER.post("/signup", async function(req, res){
    let userDocuments = await userCollection.get();
    let userExist = false;
    userDocuments.forEach(doc => {
        let userData = doc.data();
        if (userData.username == req.body.username) {
            userExist = true;
        };
    });
    passwordCheck = req.body.password == req.body.passwordConfirm && 5 <= req.body.password.length <= 10;
    let regex = /^[a-zA-Z0-9]+$/;
    usernameCheck = regex.test(req.body.username);
    if (!userExist && passwordCheck && usernameCheck) {
        let newUserRef = userCollection.doc();
        await newUserRef.set({
            username: req.body.username,
            password: req.body.password
        });
        res.status(200).json({status: "Signed up successfully. Please log in."});
    }
    else {
        res.status(400).json({
            status: "Something went wrong. Please check your input and try again",
            inputRequirement: "Username has at least 6 alphanumberic characters. The length of password must be between 5 and 10"
        });
    }
});

ROUTER.get("/stats", sessionAuthenticationAPI, async function(req, res) {
    let stats = await statsDocument.get();
    res.status(200).json({operation: stats.data()});
})

module.exports = ROUTER;