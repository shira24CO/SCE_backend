import {Express}from "express";
import request from 'supertest';
import fs from 'mz/fs';

jest.setTimeout(30000);
let app:Express;
describe("File Tests", ()=>{
    test("upload file",async () =>{
        const filePath = "C:/WebSystemsClass/sce_frontend/sce_frontend/assets/man_4140048.png";
        console.log(filePath);
        
        const rs = await fs.exists(filePath);
        if(rs){
             const response = await request(app)
                 .post("/file/file?file=123.jpeg").attach('file',filePath)
             expect(response.statusCode).toEqual(200);
        }
    })
})