/**
 * Mongoose module
 *
 * @type {*}
 */
const MONGOOSE = require("mongoose");

/**
 * Returns a random value between min and max
 * @function
 * @param {*} min
 * @param {*} max
 * @returns {*}
 */
function randRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Driver Schema
 *
 * @type {*}
 */
const DRIVER_SCHEMA = MONGOOSE.Schema({
    driverID: {
        type: String,
        default: function idGenerator() {
            const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let letters = ""
            for (let i = 0; i < 3; i++) {
                letters += CHARS.charAt(randRange(0, CHARS.length));
            };
            return "D" + randRange(10, 100) + "-33-" + letters;
        }
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(name) {
                let regex = /^[a-zA-Z ]+$/;
                return 3<=name.length<=20 && regex.test(name);
            },
            message: "The length of name must be between 3 and 20 and name must be alphabetic."
        }
    },
    department: {
        type: String,
        required: true,
        validate: {
            validator: function(department) {
                return ["Food", "Furniture", "Electronic"].includes(department);
            },
            message: "Department must be \"Food\", \"Furniture\", or \"Electronic\""
        }
    },
    licence: {
        type: String,
        required: true,
        validate: {
            validator: function(licence) {
                let regex = /^[a-zA-Z0-9]+$/;
                return licence.length == 5 && regex.test(licence);
            },
            message: "Licence must be 5-character-long and alphanumeric."
        }
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    assignedPackages: [{
        type: MONGOOSE.Schema.ObjectId,
        ref: "Package"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = MONGOOSE.model("Driver", DRIVER_SCHEMA);