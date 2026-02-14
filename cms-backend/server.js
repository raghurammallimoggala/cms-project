const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", require("./router/cms"));

const PORT =process.env.PORT || 3000

app.listen(PORT, ()=>{
  console.log(`Server Running on port ${PORT}`);
});
