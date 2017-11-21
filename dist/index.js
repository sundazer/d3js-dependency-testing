"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const port = parseInt(process.env.PORT, 10) || 4200;
const server = new server_1.App(port);
