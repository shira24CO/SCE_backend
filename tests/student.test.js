const request = require('supertest');
const appInit = require("../App");
const mongoose = require("mongoose");
const Student = require("../models/student_model");

let app;
beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await Student.deleteMany();
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

const student = [
    {
        name: "John Doe",
        _id: "12345",
        age: 22
    },
    {
        name: "Jane Doe",
        _id: "12346",
        age: 23
    }
]

describe("Student", () => {
    test("Get /Student - empty collection", async () => {
        const res = await request(app).get("/student");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    test("Get /Student", async () => {
        const res = await request(app).post("/student").send(student[0]);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual("John Doe");
        const res2 = await request(app).get("/student");
        expect(res2.statusCode).toBe(200);
        const data = res2.body;
        expect(data[0].name).toBe(student[0].name);
        expect(data[0]._id).toBe(student[0]._id);
        expect(data[0].age).toBe(student[0].age);
    });
});


