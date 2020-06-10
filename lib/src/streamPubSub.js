"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
/**
 * disapch readable stream to writable stream
 */
class StreamPush {
    constructor() {
        this.subscriber = [];
    }
    /**
     * write data to subscribed stream
     * @param stream - source stream
     * @returns void
     */
    write(stream) {
        for (let s of this.subscriber) {
            stream.pipe(s);
        }
    }
    /**
     * register the steam will to be written
     * @param writableStream - destination stream
     * @returns void
     */
    register(writableStream) {
        const pass = new stream_1.PassThrough().pipe(writableStream);
        this.subscriber.push(pass);
    }
    /**
     * remove subscribed write stream
     * @param readableStream
     * @returns void
     */
    remove(readableStream) {
        const index = this.subscriber.indexOf(readableStream);
        if (index !== -1) {
            this.subscriber.splice(index, 1);
        }
    }
    /**
     * return subscriber size
     * @returns number
     */
    size() {
        return this.subscriber.length;
    }
}
exports.StreamPush = StreamPush;
/**
 * publish stream to subscriber
 */
class StreamPubSub {
    constructor() {
        this.writerMap = new Map();
    }
    /**
     * publish read stream to subscribed topic
     * @param topic
     * @param readStream
     * @returns void
     */
    publish(topic, readStream) {
        let writer = this.writerMap.get(topic);
        if (writer === undefined) {
            return;
        }
        writer.write(readStream);
    }
    /**
     * subscribe topic
     * @param topic
     * @param writeStream
     * @returns void
     */
    subscribe(topic, writeStream) {
        let writer = this.writerMap.get(topic);
        if (writer === undefined) {
            writer = new StreamPush();
        }
        writer.register(writeStream);
        this.writerMap.set(topic, writer);
    }
}
exports.default = StreamPubSub;
//# sourceMappingURL=streamPubSub.js.map