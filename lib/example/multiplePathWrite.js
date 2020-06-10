"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const fs = require("fs");
let reader = fs.createReadStream('./example/test.txt');
let writer1 = fs.createWriteStream('./example/output1.txt');
let writer2 = fs.createWriteStream('./example/output2.txt');
let streamPush = new index_1.default.StreamPush();
streamPush.register(writer1);
streamPush.register(writer2);
streamPush.write(reader);
//# sourceMappingURL=multiplePathWrite.js.map