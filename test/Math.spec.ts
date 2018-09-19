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

    it("Result should be 0 if no URLs are provided", async function() {
        let urls: string[] = [];
        let response: number;
        try {
            response = await math.add(urls);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.equal(0);
        }
    });

    it("Three URLs with numbers as strings and nested number array", async function() {
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

});
