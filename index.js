

require('dotenv').config()
const express = require('express')
const app = express()
require("./models/db");
const cors = require("cors")
const path = require('path')

// app.enable('trust proxy')

// app.use(function(request, response, next) {

//     if (process.env.NODE_ENV != 'development' && !request.secure) {
//        return response.redirect("https://" + request.headers.host + request.url);
//     }

//     next();
// })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const router = require("./route/routes")

app.use("/api", router)

app.use(express.static(path.join(__dirname, "/client/build")))

// app.get("/", (req, res) => res.send("iShop server running"))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})

const port = process.env.PORT || 8500
app.listen(port, () => console.log(`Backend running on ${port}`))

