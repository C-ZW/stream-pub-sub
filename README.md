# stream-pub-sub

dependency free stream publisher subscribe pattern.

## Installation

## Basic usage

### StreamPush
Low level dispacher with single source data stream.

1. Write file to multiple path;
```ts
import SPS from '../index';
import * as fs from 'fs';

let reader = fs.createReadStream('./example/test.txt');

let writer1 = fs.createWriteStream('./example/output1.txt');
let writer2 = fs.createWriteStream('./example/output2.txt');

let streamPush = new SPS.StreamPush();

streamPush.subscribe(writer1);
streamPush.subscribe(writer2);

streamPush.write(reader);
```