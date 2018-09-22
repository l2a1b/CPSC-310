import Log from "./Util";

import * as request from 'request-promise-native';

interface IMath {
    add(urls: string[]): Promise<number>;

    multiply(urls: string[]): Promise<number>;
}

export default class Math implements IMath {
    constructor() {
        Log.trace('Math::init()');
    }

    add(urls: string[]): Promise<number> {
        return new Promise(async function (fulfill, reject) {
            try {
                if (urls.length === 0) {
                    fulfill(0);
                } else {
                    let promiseArray = [];
                    for (let i = 0; i < urls.length; i++) {
                        promiseArray.push(new Promise(function (fulfill, reject) {
                            let sum = 0;
                            request(urls[i]).then(function (JSONstring) {
                                try {
                                    JSON.parse(JSONstring);
                                } catch (e) {
                                    reject('Error: Could not parse JSON');
                                }
                                let objectJSON = JSON.parse(JSONstring);
                                if (Array.isArray(objectJSON)) {
                                    let array = objectJSON;
                                    for (let j = 0; j < array.length; j++) {
                                        if ((typeof array[j]) === "number") {
                                            sum = sum + array[j];
                                        }
                                    }
                                } else {
                                    for (let key of Object.keys(objectJSON)) {
                                        if (Array.isArray(objectJSON[key])) {
                                            let array = objectJSON[key];
                                            for (let j = 0; j < array.length; j++) {
                                                if ((typeof array[j]) === "number") {
                                                    sum = sum + array[j];
                                                }
                                            }
                                        }
                                    }
                                }
                                fulfill(sum);
                            }).catch(function (e) {
                                reject('Error: URL could not be retrieved');
                            });
                        }))
                    }
                    await Promise.all(promiseArray).then(function (result) {
                        fulfill(result.reduce(function (a, b) {
                            return a + b;
                        }))
                    }).catch(function (e) {
                        reject(e);
                    })
                }
            } catch (e) {
                reject(e.message);
            }
        })
    }

    multiply(urls: string[]): Promise<number> {
        return new Promise(async function (fulfill, reject) {
            try {
                if (urls.length === 0) {
                    fulfill(0);
                } else {
                    let promiseArray = [];
                    for (let i = 0; i < urls.length; i++) {
                        promiseArray.push(new Promise(function (fulfill, reject) {
                            let prod = 1;
                            request(urls[i]).then(function (JSONstring) {
                                try {
                                    JSON.parse(JSONstring);
                                } catch (e) {
                                    reject('Error: Could not parse JSON');
                                }
                                let objectJSON = JSON.parse(JSONstring);
                                if (Array.isArray(objectJSON)) {
                                    let array = objectJSON;
                                    for (let j = 0; j < array.length; j++) {
                                        if ((typeof array[j]) === "number") {
                                            prod = prod * array[j];
                                        }
                                    }
                                } else {
                                    for (let key of Object.keys(objectJSON)) {
                                        if (Array.isArray(objectJSON[key])) {
                                            let array = objectJSON[key];
                                            for (let j = 0; j < array.length; j++) {
                                                if ((typeof array[j]) === "number") {
                                                    prod = prod * array[j];
                                                }
                                            }
                                        }
                                    }
                                }
                                fulfill(prod);
                            }).catch(function (e) {
                                reject('Error: URL could not be retrieved');
                            });
                        }))
                    }
                    await Promise.all(promiseArray).then(function (result) {
                        fulfill(result.reduce(function (a, b) {
                            return a * b;
                        }))
                    }).catch(function (e) {
                        reject(e);
                    })
                }
            } catch (e) {
                reject(e.message);
            }
        })
    }

}