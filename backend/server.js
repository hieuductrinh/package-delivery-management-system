/**
 * Express module
 * @const
 */
const EXPRESS = require("express")


/**
 * Mongoose module
 * @const
 */
const MONGOOSE = require("mongoose");

const CORS = require("cors");


/**
 * Session module
 * @cosnt
 */
const SESSION = require("express-session");

/**
 * Driver Schema
 * @const
 */
const DRIVER = require("./models/driverSchema");

/**
 * Package Schema
 * @const
 */
const PACKAGE = require("./models/packageSchema");

/**
 * App instance
 * @const
 */
const APP = EXPRESS();

APP.use(CORS({
    origin: "http://localhost:4200", // or your Angular app's URL
    credentials: true
}));
/**
 * DRIVER_API_ROUTER instance
 * @const
 */
const DRIVER_API_ROUTER = require("./routes/driversAPI");

/**
 * PACKAGE_API_ROUTER instance
 * @const
 */
const PACKAGE_API_ROUTER = require("./routes/packagesAPI");

/**
 * USER_API_ROUTER instance
 * @const
 */
const USER_API_ROUTER = require("./routes/usersAPI");

/**
 * Port number
 * @const
 */
const PORT_NUMBER = 8080;

const SOCKET_SERVER = require('http').Server(APP);

const IO = require("socket.io")(SOCKET_SERVER);

IO.on("connection", function(socket) {
    console.log("new connection made");

    socket.on("translateRequest", async function(data){
        let response = await translateText(data.text, data.target)
        socket.emit("translateResponse", response);
    })

    socket.on("ttsRequest", async function(data){
        let fileName = crypto.randomUUID()
        await tts(data, fileName)
        socket.emit("ttsResponse", `assets/${fileName}.mp3`);
    })

    socket.on("genaiRequest", async function(city){
        let response = await geminiModel.generateContent(`Calculate the distance between Melbourne and ${city}.
            Respond in this format: "The distance between Melbourne and [destination] is [distance]km`);
        socket.emit("genaiResponse", response.response.text());
    })

  })
/**
 * Configure the port number
 * @name listen
 * @function
 * @param {int} port - Express port number
 * @param {Function} callback - Express callback
 */
// APP.listen(PORT_NUMBER, function() {
//     console.log(`Listening on port ${PORT_NUMBER}`);
// });

SOCKET_SERVER.listen(PORT_NUMBER, () => {
    console.log("Listening on port " + PORT_NUMBER);
});


/**
 * Session instance
 *
 * @type {{ secret: string; cookie: {}; resave: boolean; saveUninitialized: boolean; }}
 */
var session_instance = {
    secret: "EnterYourSecret",
    cookie: {
        sameSite: "lax", // or "none" if using HTTPS
        secure: false    // set to true if using HTTPS
    },
    resave: false,
    saveUninitialized: true
};

/**
 * Configure session
 * @name use/session
 * @function
 */
APP.use(SESSION(session_instance));

/**
 * Set view engine
 * @name set/view
 * @function
 */
APP.set("view engine", "html");

/**
 * Configure json
 * @name use/json
 * @function
 */
APP.use(EXPRESS.json());

/**
 * Configure urlencoded
 * @name use/urlencoded
 * @function
 */
APP.use(EXPRESS.urlencoded({ extended: true }));

/**
 * Configure driver api router
 * @name use/DRIVER_API_ROUTER
 * @function
 * @param {string} path - Express path
 * @param {EXPRESS.Router} DRIVER_API_ROUTER - Express router
 */
APP.use("/api/v1/drivers", DRIVER_API_ROUTER);

/**
 * Configure package api router
 * @name use/PACKAGE_API_ROUTER
 * @function
 * @param {string} path - Express path
 * @param {EXPRESS.Router} PACKAGE_API_ROUTER - Express router
 */
APP.use("/api/v1/packages", PACKAGE_API_ROUTER);

/**
 * Configure user api router
 * @name use/USER_API_ROUTER
 * @function
 * @param {string} path - Express path
 * @param {EXPRESS.Router} USER_API_ROUTER - Express router
 */
APP.use("/api/v1/users", USER_API_ROUTER);

/**
 * Configure express.static function (public)
 * @name use/express.static/public
 * @function
 * @param {string} path - Express path
 * @param {Function} Express.static - Express.static function
 */
APP.use(EXPRESS.static('public'));

/**
 * Configure express.static function (bootstrap)
 * @name use/express.static/bootstrap
 * @function
 * @param {Function} Express.static - Express.static function
 */
APP.use(EXPRESS.static("node_modules/bootstrap/dist/css"));

/**
 * URL to mongodb
 *
 * @type {"mongodb://localhost:27017/package-delivery-management-system"}
 */
const URL = "mongodb://localhost:27017/package-delivery-management-system";

/**
 * Connect to mongodb
 *
 * @async
 * @param {String} url
 * @returns {String}
 */
async function connect(url) {
	await MONGOOSE.connect(url);
	return "connected";
};

APP.use(EXPRESS.static("./dist/assignment-3/browser"));


// --------------- Translate ---------------
const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate();

async function translateText(text, target) {
  let [translations] = await translate.translate(text, target);
  let response = {
    translation: translations,
    text: text,
    target: target
    }
  return response
}

// --------------- TTs ---------------
const fs = require("fs");

const textToSpeech = require("@google-cloud/text-to-speech");

const TTS = new textToSpeech.TextToSpeechClient();

async function tts(text, fileName) {
    let request = {
        input: { text: text },
        // Select the language and SSML Voice Gender (optional)
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        // Select the type of audio encoding
        audioConfig: { audioEncoding: "MP3" },
      };

      TTS.synthesizeSpeech(request, (err, response) => {
        if (err) {
          console.error("ERROR:", err);
          return;
        }
        fs.writeFile(`public/assets/${fileName}.mp3`, response.audioContent, "binary", err => {
          if (err) {
            console.error("ERROR:", err);
            return;
          }
        });
      });
}

// --------------- Gemini ---------------

const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemini_api_key = "Enter your key";
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

connect(URL)
	.then(console.log)
	.catch((err) => console.log(err));