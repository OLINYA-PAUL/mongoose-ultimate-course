// MONOGOSS CONNECTION

const { default: mongoose } = require("mongoose");

// turniing of buffering in mongodb

mongoose.set("bufferCommands", false);

// connecting to mongodb

mongoose.connect("http://localhost:127.0.01");

// handling error connections on mongodb on initial time

mongoose.connect("http://localhost:127.0.01").catch((error) => {
  if (error) throw new Error(error, "on able to connect");

  return;
});

// const mongoDbConnect = async (url) => {
//   try {
//     await mongoose.connect(url);
//   } catch (error) {
//     if (error in Error) {
//       console.log(error);
//     }
//   }
// };

// module.exports = { mongoDbConnect };
// handling error connections on mongodb on after initial time
// mongoose.connection.on("error", (err) => {
//   console.log(error);
// });
