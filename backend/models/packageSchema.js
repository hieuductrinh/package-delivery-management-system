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
 * Package Schema
 *
 * @type {*}
 */
const PACKAGE_SCHEMA = MONGOOSE.Schema({
    packageID: {
        type: String,
        default: function idGenerator() {
            const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let letters = ""
            for (let i = 0; i < 2; i++) {
                letters += CHARS.charAt(randRange(0, CHARS.length));
            };
            return "P" + letters + "-HT-" + randRange(100, 1000);
        }
    },
    title: {
        type: String,
        required: true,
        validate: {
            validator: function(name) {
                let regex = /^[a-zA-Z0-9 ]+$/;
                return 3<=name.length<=15 && regex.test(name);
            },
            message: "The length of name must be between 3 and 15 and name must be alphanumeric."
        }
    },
    weight: {
        type: Number,
        required: true,
        validate: {
            validator: function(weight) {
                return weight > 0;
            },
            message: "Weight must be a positive number"
        }
    },
    destination: {
        type: String,
        required: true,
        validate: {
            validator: function(destination) {
                let regex = /^[a-zA-Z0-9 ]+$/;
                return 5 <= destination.length <= 15 && regex.test(destination);
            },
            message: "The length of destination must be between 5 and 15 and destination must be alphanumeric."
        }
    },
    description: {
        type: String,
        validate: {
            validator: function(licence) {
                return 0 <= licence.length <= 30;
            },
            message: "The length of destination must be between 0 and 30."
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAllocated: {
        type: Boolean,
        required: true
    },
    driverID: {
        type: MONGOOSE.Schema.ObjectId,
        required: true,
        ref: "Driver"
    }
})

module.exports = MONGOOSE.model("Package", PACKAGE_SCHEMA);