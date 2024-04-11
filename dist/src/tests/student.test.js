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
const user_model_1 = __importDefault(require("../models/user_model"));
const testUser = {
    email: "teststudent@gmail.com",
    password: "123456",
    accessToken: null
};
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    yield student_model_1.default.deleteMany();
    yield user_model_1.default.deleteMany({ email: testUser.email });
    yield (0, supertest_1.default)(app).post("/auth/register").send(testUser);
    const res = yield (0, supertest_1.default)(app).post("/auth/login").send(testUser);
    testUser.accessToken = res.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
const students = [
    {
        name: "John Doe",
        _id: "12345",
        age: 22,
    },
    {
        name: "Jane Doe 2",
        _id: "12346",
        age: 23,
    },
];
describe("Student", () => {
    test("Get /student - empty collection", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/student")
            .set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    }));
    test("POST /student", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/student")
            .send(students[0]).set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(students[0].name);
        // studentId = res.body._id; // Save the ID for later tests
        const res2 = yield (0, supertest_1.default)(app).get("/student")
            .set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res2.statusCode).toBe(200);
        const data = res2.body;
        expect(data[0].name).toBe(students[0].name);
        expect(data[0]._id).toBe(students[0]._id);
        expect(data[0].age).toBe(students[0].age);
    }));
    test("GET /student/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/student/" + students[0]._id)
            .set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(students[0].name);
        expect(res.body._id).toBe(students[0]._id);
        expect(res.body.age).toBe(students[0].age);
    }));
    test("Fail GET /student/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/student/00000")
            .set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(404);
    }));
    test("DELETE /student/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete("/student/" + students[0]._id)
            .set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const res2 = yield (0, supertest_1.default)(app).get("/student/" + students[0]._id)
            .set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res2.statusCode).toBe(404);
    }));
});
//# sourceMappingURL=student.test.js.map