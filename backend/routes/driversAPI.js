/**
 * Express module
 *
 * @type {*}
 */
const EXPRESS = require("express");
/**
 * Driver Controller for APIs
 *
 * @type {{ getAll: (req: any, res: any) => any; addDriver: (req: any, res: any) => any; deleteDriver: (req: any, res: any) => any; updateDriverLicenceAndDept: (req: any, res: any) => any; }}
 */
const DRIVER_CONT = require("../controllers/driverCont");
/**
 * sessionAuthenticationAPI function
 *
 * @function
 */
let { sessionAuthenticationAPI } = require("../authenticationMiddleware");

/**
 * Express router
 *
 * @type {*}
 */
const ROUTER = EXPRESS.Router();

/**
 * Route adding new driver
 * @name post/add_driver
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 * @param {Function} next - Express next
 */
ROUTER.post("/add", sessionAuthenticationAPI, DRIVER_CONT.addDriver);

/**
 * Route listing all drivers
 * @name get/list_drivers
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 * @param {Function} next - Express next
 */
ROUTER.get("/", sessionAuthenticationAPI, DRIVER_CONT.getAll);

/**
 * Route deleting driver
 * @name delete/delete_driver
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 * @param {Function} next - Express next
 */
ROUTER.delete("/delete", sessionAuthenticationAPI, DRIVER_CONT.deleteDriver);

/**
 * Route updating driver licence and department
 * @name put/update_driver
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 * @param {Function} next - Express next
 */
ROUTER.put("/update", sessionAuthenticationAPI, DRIVER_CONT.updateDriverLicenceAndDept);

module.exports = ROUTER;