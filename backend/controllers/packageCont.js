/**
 * Driver Schema
 *
 * @type {*}
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
 * FieldValue class
 *
 * @type {*}
 */
const { FieldValue } = require("firebase-admin/firestore");
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
     * @param {*} req 
     * @param {*} res 
     */
    getAll: async function(req, res) {
        let packages = await PACKAGE.find({}).populate("driverID");
        res.status(200).json(packages);
        await stats.update({retrieve: FieldValue.increment(1)});
    },
    /**
     * Add package
     * @param {*} req 
     * @param {*} res 
     */
    addPackage: async function(req, res) {
        // let package = new PACKAGE(req.body);
        try {
            let driver = await DRIVER.findOne({_id: req.body.driverID});
            if (driver == null) {
                res.status(400).json({
                    status: "ID not found"
                })
            }
            else {
                let package = new PACKAGE({
                    title: req.body.title,
                    weight: req.body.weight,
                    destination: req.body.destination,
                    isAllocated: req.body.isAllocated,
                    driverID: driver._id,
                    description: req.body.description
                });
                await package.save();
                await stats.update({insert: FieldValue.increment(1)});
                driver.assignedPackages.push(package._id);
                await driver.save();
                res.status(200).json({
                    id: package._id,
                    packageID: package.packageID
                });
            };
        }
        catch (error) {
            res.status(400).json(error);
        };
        
    },
    /**
     * Delete driver
     * @param {*} req 
     * @param {*} res 
     */
    deletePackage: async function(req, res) {
        let package = await PACKAGE.findOne({_id: req.params._id});
        let deletedPackage = await PACKAGE.deleteOne({_id: req.params._id});
        await stats.update({delete: FieldValue.increment(1)});
        if (package == null) {
            res.status(200).json(deletedPackage);
        }
        else {
            let driverID = package.driverID;
            let driver = await DRIVER.findOne({_id: driverID});
            let index = driver.assignedPackages.indexOf(package._id);
            if (index > -1) {
                driver.assignedPackages.splice(index, 1);
                driver.save();
            };
            res.status(200).json(deletedPackage);
        }
    },
    /**
     * Update package destination
     * @param {*} req 
     * @param {*} res 
     */
    updateDestination: async function(req, res) {
        try {
            let package = await PACKAGE.findOneAndUpdate({packageID: req.body.packageID}, {destination: req.body.destination}, {runValidators: true});
            if (package == null) {
                res.status(400).json({
                    statusOK: "ID not found"
                });
            }
            else {
                res.status(200).json({
                    status: "Updated successfully"
                });
            };
        }
        catch (error) {
            res.status(400).json(error);
        };
        await stats.update({update: FieldValue.increment(1)});
    }
};