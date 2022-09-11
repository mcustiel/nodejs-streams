import { describe, expect, it } from '@jest/globals';
import InputError from '../src/errors/InputError';
import { getStatusCode } from "../src/helpers";

describe("helpers", () => {

    describe("getStatusCode", () => {
        it("should return 400 for InputErrors", () => {
            expect(getStatusCode(new InputError('test'))).toEqual(400);
        });

        it("should return 500 for non-InputErrors", () => {
            expect(getStatusCode(new Error('test'))).toEqual(500);
        });
    });

    describe("ensureValidRequest", () => {
        it("should return 400 for InputErrors", () => {
            expect(getStatusCode(new InputError('test'))).toEqual(400);
        });

        it("should return 500 for non-InputErrors", () => {
            expect(getStatusCode(new Error('test'))).toEqual(500);
        });
    });
});
