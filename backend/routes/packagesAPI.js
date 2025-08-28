/**
 * Express module
 *
 * @type {*}
 */
const EXPRESS = require("express");
/**
 * Package Controller
 *
 * @type {{ getAll: (req: any, res: any) => any; addPackage: (req: any, res: any) => any; deletePackage: (req: any, res: any) => any; updateDestination: (req: any, res: any) => any; }}
 */
const PACKAGE_CONT = require("../controllers/packageCont");
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
 * Route adding package
 * @name post/add_package
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 * @param {Function} next - Express next
 */
ROUTER.post("/add", sessionAuthenticationAPI, PACKAGE_CONT.addPackage);

/**
 * Route listing all packages
 * @name get/list_packages
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 * @param {Function} next - Express next
 */
ROUTER.get("/", sessionAuthenticationAPI, PACKAGE_CONT.getAll);

/**
 * Route deleting package
 * @name delete/delete_package
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 * @param {Function} next - Express next
 */
ROUTER.delete("/delete/:_id", sessionAuthenticationAPI, PACKAGE_CONT.deletePackage);

/**
 * Route updating package destination
 * @name put/update_package
 * @function
 * @param {string} path - Express path
 * @param {Function} callback - Express callback
 * @param {Function} next - Express next
 */
ROUTER.put("/update", sessionAuthenticationAPI, PACKAGE_CONT.updateDestination);

module.exports = ROUTER;