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

const students = [
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
];

describe("Student", () => {
    test("Get /Student - empty collection", async () => {
        const res = await request(app).get("/student");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    test("POST /Student", async () => {
        const res = await request(app).post("/student").send(students[0]);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual("John Doe");
        const res2 = await request(app).get("/student");
        expect(res2.statusCode).toBe(200);
        const data = res2.body;
        expect(data[0].name).toBe(students[0].name);
        expect(data[0]._id).toBe(students[0]._id);
        expect(data[0].age).toBe(students[0].age);
    });

    test("GET /Student/:id", async () => {
        const res = await request(app).get("/student/" + students[0]._id);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(students[0].name);
        expect(res.body._id).toBe(students[0]._id);
        expect(res.body.age).toBe(students[0].age);
    });

    test("Fail Get /Student/:id", async () => {
        const res = await request(app).get("/student/00000");
        expect(res.statusCode).toBe(404);
    });

    //test delete student by id
    test("DELETE /student/:id", async () => {
        const res = await request(app).delete("/student/" + students[0]._id);
        expect(res.statusCode).toBe(200);

        const res2 = await request(app).get("/student/" + students[0]._id);
        expect(res2.statusCode).toBe(404);
    });

});


