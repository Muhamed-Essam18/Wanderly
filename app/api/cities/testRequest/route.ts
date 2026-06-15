import modelTest from "../../../models/testModel";

import {connectDB} from "../../../../lib/mongodb";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
const body = await req.json();
await connectDB();
const existingData = await modelTest.findOne({ input: body.input });
if (existingData) {
    return Response.json({
        success: false,
        message: "this input already exists in the database",
    },{ status: 400 });
   
}else {const Query = await modelTest.create({
    input: body.input,   
  
});return Response.json({ success: true, data: Query });}}