import {expect} from 'chai';

import Math from "../src/Math";
import Log from "../src/Util";

describe("MathSpec", function () {

    const urls = [
        "http://skaha.cs.ubc.ca:11313/0.json", // 0: []
        "http://skaha.cs.ubc.ca:11313/1.json", // 1: {}
        "http://skaha.cs.ubc.ca:11313/2.json", // 2: {"keys": [1,2,3]}
        "http://skaha.cs.ubc.ca:11313/4543.json", // 3: [-1,-3,2]
        "http://skaha.cs.ubc.ca:11313/4544.json", // 4: [-7,5]
        "http://skaha.cs.ubc.ca:11313/4666.json", // 5: ["4", 3
        "http://skaha.cs.ubc.ca:11313/4670.json", // 6: ["2", "4" ]
        "http://skaha.cs.ubc.ca:11313/4968.json", // 7: [ 1, 2, 5, 4 ]
        "http://skaha.cs.ubc.ca:11313/4969.json", // 8: [ 3, "2", 7, "4" ]
        "http://skaha.cs.ubc.ca:11313/7b77.json", // 9: { "id": "foo", "bar": false, "baz": 6, "values": [1, 2, 3] }
        "http://skaha.cs.ubc.ca:11313/822d.json", // 10: {"val": {"foo": [1, 2, 3]}}
        "http://skaha.cs.ubc.ca:11313/944a.json", // 11: [ 6221 ]
    ];

    let math: Math = null;
    beforeEach(function () {
        math = new Math();
    });

    afterEach(function () {
        math = null;
    });

    it("add - Result should be 0 for URL 0, 1, 6, and 10", async function() {
        let testUrls: string[] = [ urls[0], urls[1], urls[6], urls[10] ];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(0);
        }
    });

    it("add - Result should be 6 for URL 9", async function() {
        let testUrls: string[] = [ urls[9] ];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(6);
        }
    });

    it("add - Result should be 8 for URL 3, 4, and 7", async function() {
        let testUrls: string[] = [ urls[3], urls[4], urls[7] ];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(8);
        }
    });

    it("add - Result should be 16 for URL 2, and 8", async function() {
        let testUrls: string[] = [ urls[2], urls[8] ];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(16);
        }
    });

    it("add - Three URLs with numbers as strings and nested number array", async function() {
        let testUrls: string[] = [ urls[7], urls[8], urls[10] ];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(22);
        }
    });

    it("add - Result should be 0 if no URLs are provided", async function() {
        let testUrls: string[] = [];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(0);
        }
    });

    it("add - Error should be thrown for invalid JSON file", async function() {
        let testUrls: string[] = [ urls[5] ];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal('Error: Could not parse JSON');
        }
    });

    it("multiply - Result should be 6 for URL 0 and 2", async function() {
        let testUrls: string[] = [ urls[0], urls[2] ];
        let response: number;
        try {
            response = await math.multiply(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(6);
        }
    });

    it("multiply - Result should be 1 for URL 1", async function() {
        let testUrls: string[] = [ urls[1] ];
        let response: number;
        try {
            response = await math.multiply(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(1);
        }
    });

    it("multiply - Result should be 0 for URL 3 and 11", async function() {
        let testUrls: string[] = [ urls[3], urls[11] ];
        let response: number;
        try {
            response = await math.multiply(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(37326);
        }
    });

    it("multiply - Result should be -35 for URL 4 and 6", async function() {
        let testUrls: string[] = [ urls[4], urls[6] ];
        let response: number;
        try {
            response = await math.multiply(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(-35);
        }
    });

    it("multiply - Result should be 5040 for URL 7, 8, and 9", async function() {
        let testUrls: string[] = [ urls[7], urls[8], urls[9] ];
        let response: number;
        try {
            response = await math.multiply(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(5040);
        }
    });

    it("multiply - Error should be thrown for invalid URL file", async function() {
        let testUrls: string[] = [ 'hahaha' ];
        let response: number;
        try {
            response = await math.multiply(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal('Error: URL could not be retrieved');
        }
    });

    it("multiply - Error should be thrown for invalid JSON file", async function() {
        let testUrls: string[] = [ urls[5] ];
        let response: number;
        try {
            response = await math.multiply(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal('Error: Could not parse JSON');
        }
    });

    it("add - Error should be thrown for invalid URL file", async function() {
        let testUrls: string[] = [ 'hahaha' ];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal('Error: URL could not be retrieved');
        }
    });

    it("add - Result should be 6221 for URL 11", async function() {
        let testUrls: string[] = [ urls[11] ];
        let response: number;
        try {
            response = await math.add(testUrls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(6221);
        }
    });

});
