const express = require("express");
const { mongoDbConnect } = require("./mongoose"); // Ensure the correct path to your file
const { mongo, default: mongoose } = require("mongoose");
const SchemeModel = require("./schemeModel");
const { path } = require("path");

const app = express();

app.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const getuserId = await SchemeModel.find(_id);

    if (!getuserId) {
      return res.status(404).json({ message: "User not found" }); // Handle not found
    }

    res.status(200).json({ message: "OK", getuserId });
  } catch (error) {
    console.log;
  }
});

app.post("/registerUser", async (req, res) => {
  try {
    const { email, password, FirstName, LastName, nikeName } = req.body;

    const hashPassword = await bycrpt.hash(password, 10);

    const userField = {
      email,
      password: hashPassword,
      FirstName,
      LastName,
      nikeName,
    };
    const user = new SchemeModel(userField);

    if (Object.values(user).some((user) => !user)) {
      res.status(410).json({ message: "all fields are required" });

      return;
    }

    const signInToken = sendUserTokenEmail(userField);

    const addToGmailTemplate = ejs.render(
      path.join(__dirname, "./ejsEmailTemplate", signInToken)
    );

    const saveUserToDb = await user.save();
    res.status(200).json({
      message: `credientials sent successfully ${addToGmailTemplate}`,
      suceess: true,
      addToGmailTemplate,
      saveUserToDb,
    });
  } catch (error) {
    if (error in Error) {
      console.log(error.message);
      res.status(410).json({ message: "all fields are required" });
      return;
    }
  }
});

const localHost = 3000; // No need for fallback
let mongoURI;

const sendUserTokenEmail = async (userToken) => {
  const getTokenFromJWT = await jwt.sign(userToken);
  if (getTokenFromJWT) {
    getTokenFromJWT = userToken.toString();

    return getTokenFromJWT;
  }
};

const saveOrUpdateDocumentInDB = async (req, res, next) => {
  const randomUUID = crypto.randomUUID();
  try {
    const getIDandUpdate = await SchemeModel.findById(
      { _id: randomUUID },
      { $set: { email: "olinyaCpaul@gmail.com123" } },
      { runValidators: true }
    );
  } catch (error) {}
};

// understaning preMethod
app.options("/", async function (res, req) {
  console.log(res, req);
});

const preModel = async (req, res) => {
  try {
    const paraentModel = SchemeModel.deleteMany({ _id });
  } catch (error) {
    this.error = new Error(error.message);
    this.error.stack = error.stack;

    return this.error; // Preserve the original error stack
  }
};

// paraentModel.pre;
// two ways to overwrite document in mongodb
// using overwrite method
// using replace function

// NOT SUBDOCUMENTS ARE NOT SAVE INDIVIDUALLY

app.listen(localHost, async () => {
  try {
    // await mongoose.connect(
    //   "mongodb+srv://mongolearning:12345@cluster0.l5lzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }
    // );
    console.log("Connected to MongoDB successfully");
    console.log(`App is listening on port ${localHost}`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error}`);
  }
});
