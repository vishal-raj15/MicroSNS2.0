const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const cookieParser = require("cookie-parser");
const app = express();
const fileUpload = require("express");

const corsOptions = {
  credentials: true,
  preflightContinue: true,
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  exposedHeaders: ["X-auth-token"],
};

// global middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routers
const router = require("./routes/productRouter");

app.use("/api/users", router);

db.sequelize.sync({ force: false }).then(() => {
  console.log(
    "Drop and re-sync db..............................................."
  );
});

// api
app.get("/", (req, res) => {
  res.json({
    name: "Vishal",
    email: "Vishal@gmail.com",
  });
});

// port
const PORT = process.env.PORT || 3001;

// server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// to avoid if there's any old server already running because
// of nodemon self restarting
process.once("SIGUSR2", () =>
  server.close((err) => process.kill(process.pid, "SIGUSR2"))
);
