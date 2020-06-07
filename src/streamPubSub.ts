import { PassThrough, Writable, Readable } from 'stream';

/**
 * disapch readable stream to writable stream
 */
export class StreamPush {
    private subscriber: Writable[];

    constructor() {
        this.subscriber = [];
    }

    /**
     * write data to subscribed stream
     * @param stream - source stream
     * @returns void
     */
    write(stream: Readable): void {
        for (let s of this.subscriber) {
            stream.pipe(s);
        }
    }

    /**
     * register the steam will to be written
     * @param writableStream - destination stream
     * @returns void
     */
    register(writableStream: Writable): void {
        const pass = new PassThrough().pipe(writableStream);
        this.subscriber.push(pass);
    }

    /**
     * remove subscribed write stream
     * @param readableStream 
     * @returns void
     */
    remove(readableStream: Writable): void {
        const index = this.subscriber.indexOf(readableStream)
        if (index !== -1) {
            this.subscriber.splice(index, 1);
        }
    }

    /**
     * return subscriber size
     * @returns number
     */
    size(): number {
        return this.subscriber.length;
    }
}

/**
 * publish stream to subscriber
 */
export default class StreamPubSub {
    private writerMap: Map<string, StreamPush>;

    constructor() {
        this.writerMap = new Map();
    }

    /**
     * publish read stream to subscribed topic
     * @param topic 
     * @param readStream
     * @returns void
     */
    publish(topic: string, readStream: Readable): void {
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
    subscribe(topic: string, writeStream: Writable): void {
        let writer = this.writerMap.get(topic);
        if (writer === undefined) {
            writer = new StreamPush();
        }
        writer.register(writeStream);
        this.writerMap.set(topic, writer);
    }
}
