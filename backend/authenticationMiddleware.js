module.exports = {
    /**
     * sessionAuthenticationAPI function
     * @function
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    sessionAuthenticationAPI: (req, res, next) => {
        if (!req.session.user) {
            res.status(401).json({status: "Please sign in"});
        }
        else {
            next();
    }}
        // res.status(401).json({status: "Please sign in"})
}
