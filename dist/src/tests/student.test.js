"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("../models/student_model"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    yield student_model_1.default.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
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
    test("Get /Student - empty collection", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/student");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    }));
    test("POST /Student", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/student").send(students[0]);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual("John Doe");
        const res2 = yield (0, supertest_1.default)(app).get("/student");
        expect(res2.statusCode).toBe(200);
        const data = res2.body;
        expect(data[0].name).toBe(students[0].name);
        expect(data[0]._id).toBe(students[0]._id);
        expect(data[0].age).toBe(students[0].age);
    }));
    test("GET /Student/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/student/" + students[0]._id);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(students[0].name);
        expect(res.body._id).toBe(students[0]._id);
        expect(res.body.age).toBe(students[0].age);
    }));
    test("Fail Get /Student/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/student/00000");
        expect(res.statusCode).toBe(404);
    }));
    //test delete student by id
    test("DELETE /student/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete("/student/" + students[0]._id);
        expect(res.statusCode).toBe(200);
        const res2 = yield (0, supertest_1.default)(app).get("/student/" + students[0]._id);
        expect(res2.statusCode).toBe(404);
    }));
});
//# sourceMappingURL=student.test.js.map