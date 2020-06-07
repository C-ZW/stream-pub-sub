import SPS from '../index';
import * as fs from 'fs';

let reader = fs.createReadStream('./example/test.txt');

let writer1 = fs.createWriteStream('./example/output1.txt');
let writer2 = fs.createWriteStream('./example/output2.txt');

let streamPush = new SPS.StreamPush();

streamPush.register(writer1);
streamPush.register(writer2);

streamPush.write(reader);
