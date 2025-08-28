/**
 * FieldValue class
 *
 * @const
 */
const { FieldValue } = require("firebase-admin/firestore");
/**
 * Driver Schema
 *
 * @const
 */
const DRIVER = require("../models/driverSchema");
/**
 * Package Schema
 *
 * @type {*}
 */
const PACKAGE = require("../models/packageSchema");
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

let stats = DB.collection("data").doc("stats");

module.exports = {
    /**
     * Returns driver list
     * @function
     * @param {*} req 
     * @param {*} res 
     */
    getAll: async function(req, res) {
        let drivers = await DRIVER.find({}).populate("assignedPackages");
        res.status(200).json(drivers);
        await stats.update({retrieve: FieldValue.increment(1)});
    },
    /**
     * Add driver
     * @function
     * @param {*} req 
     * @param {*} res 
     */
    addDriver: async function(req, res) {
        let driver = new DRIVER(req.body);
        try {
            await driver.save();
            res.status(200).json({
                id: driver._id,
                driverID: driver.driverID
            });
        }
        catch (error) {
            res.status(400).json(error);
        }
        await stats.update({insert: FieldValue.increment(1)});
    },
    /**
     * Delete driver
     * @function
     * @param {*} req 
     * @param {*} res 
     */
    deleteDriver: async function(req, res) {
        let driver = await DRIVER.deleteOne({_id:req.query._id});
        if (driver.deletedCount != 0) {
            let deletedPackage = await PACKAGE.deleteMany({driverID: req.query._id});
        }
        await stats.update({delete: FieldValue.increment(1)});
        res.status(200).json(driver)
    },
    /**
     * Update driver licence and department
     * @function
     * @param {*} req 
     * @param {*} res 
     */
    updateDriverLicenceAndDept: async function(req, res) {
        try {
            let record = {
                licence: req.body.licence,
                department: req.body.department
            }
            let driver = await DRIVER.findOneAndUpdate({driverID: req.body.driverID}, record, {runValidators: true});
            if (driver == null) {
                res.status(400).json({
                    status: "ID not found"
                });
            }
            else {
                res.status(200).json({
                    status: "Driver updated successfully"
                });
            };
        }
        catch (error) {
            res.status(400).json(error);
        };
        await stats.update({update: FieldValue.increment(1)});
    }
};