/// <reference types="node" />
import { Writable, Readable } from 'stream';
/**
 * disapch readable stream to writable stream
 */
export declare class StreamPush {
    private subscriber;
    constructor();
    /**
     * write data to subscribed stream
     * @param stream - source stream
     * @returns void
     */
    write(stream: Readable): void;
    /**
     * register the steam will to be written
     * @param writableStream - destination stream
     * @returns void
     */
    register(writableStream: Writable): void;
    /**
     * remove subscribed write stream
     * @param readableStream
     * @returns void
     */
    remove(readableStream: Writable): void;
    /**
     * return subscriber size
     * @returns number
     */
    size(): number;
}
/**
 * publish stream to subscriber
 */
export default class StreamPubSub {
    private writerMap;
    constructor();
    /**
     * publish read stream to subscribed topic
     * @param topic
     * @param readStream
     * @returns void
     */
    publish(topic: string, readStream: Readable): void;
    /**
     * subscribe topic
     * @param topic
     * @param writeStream
     * @returns void
     */
    subscribe(topic: string, writeStream: Writable): void;
}
