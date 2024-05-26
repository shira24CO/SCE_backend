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
jest.setTimeout(30000);
let app; // This will be used in future tests
describe("File Tests", () => {
    test("upload file", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = `${__dirname}/profilePicture.png`; // This will be used in future tests
        // Example of using app and filePath in a future test
        const response = yield (0, supertest_1.default)(app).post('/upload').attach('file', filePath);
        expect(response.status).toBe(200);
    }));
});
//# sourceMappingURL=file.test.js.map