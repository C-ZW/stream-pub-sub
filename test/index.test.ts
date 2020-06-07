import SPS from '../index';
import { Readable, PassThrough } from 'stream';

describe('', () => {
    test('test streamPush', (done) => {
        let result1: any = '';
        let result2: any = '';

        async function* generate() {
            yield 'a';
            yield 'b';
            yield 'c';
        }

        const readable = Readable.from(generate());
        readable.on('end', () => {
            expect(result1).toEqual('abc');
            expect(result2).toEqual('abc');
            done();
        })

        let streamPush = new SPS.StreamPush();
        let aStream = new PassThrough();
        let bStream = new PassThrough();

        aStream.on('data', (c) => {
            result1 += c.toString();
        })

        bStream.on('data', (c) => {
            result2 += c.toString();
        })

        streamPush.register(aStream);
        streamPush.register(bStream);
        streamPush.write(readable);
    })

    test('streamPubSub', (done) => {
        async function* generate() {
            yield 'a';
            yield 'b';
            yield 'c';
        }

        const readable = Readable.from(generate());

        let streamPush = new SPS.StreamPubSub();
        let aStream = new PassThrough();
        let bStream = new PassThrough();

        let result1: any = '';
        let result2: any = '';

        aStream.on('data', (c) => {
            result1 += c.toString();
        })

        bStream.on('data', (c) => {
            result2 += c.toString();
        })

        const topic1 = 'topic1';
        const topic2 = 'topic2';
        streamPush.subscribe(topic1, aStream);
        streamPush.subscribe(topic1, bStream);

        streamPush.subscribe(topic2, aStream);
        streamPush.subscribe(topic2, bStream);

        streamPush.publish(topic1, readable);

        readable.on('end', () => {
            expect(result1).toEqual('abc');
            expect(result2).toEqual('abc');
            done()
        })
    })
})