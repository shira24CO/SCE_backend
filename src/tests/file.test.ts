import { Express } from "express";

import request from 'supertest';

jest.setTimeout(30000);

let app: Express; // This will be used in future tests

describe("File Tests", () => {
    test("upload file", async () => {
        const filePath = `${__dirname}/profilePicture.png`; // This will be used in future tests

        // Example of using app and filePath in a future test
        const response = await request(app).post('/upload').attach('file', filePath);
        expect(response.status).toBe(200);
    });
});
