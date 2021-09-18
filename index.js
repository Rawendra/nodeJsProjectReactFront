const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");

const userRoutes = require("./routes/api/user");
const profileRoutes = require("./routes/api/profile.js");
const authRoutes = require("./routes/api/auth");
const postsRoutes = require("./routes/api/posts");
const app = express();
const path = require("path");

// Init Middleware
app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

connectDB();
//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);
//including all the routes as middleware on express app
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", () => {
    res.sendFile(path.resolve(__dirname, client, build, index.html));
  });
}

app.listen(4000, () => {
  console.log("the server is up and running on port 4000");
});
