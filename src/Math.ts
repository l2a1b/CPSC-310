import Log from "./Util";

import * as request from 'request-promise-native';

interface IMath {
    add(urls: string[]): Promise<number>;
    multiply(urls: string[]): Promise<number> ;
}

export default class Math implements IMath {
    constructor() {
        Log.trace('Math::init()');
    }

    add(urls: string[]): Promise<number> {
        return new Promise(function (fulfill, reject) {
            // TODO: implement
            fulfill(-1)
        });
    }

    multiply(urls: string[]): Promise<number> {
        return new Promise(function (fulfill, reject) {
            // TODO: implement (not in this tutorial!)
            fulfill(-1)
        });
    }

}