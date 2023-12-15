const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const {createserver}=require("http")
require('dotenv').config();
const httpServer = createserver(app);
