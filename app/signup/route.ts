// app/create-admin/route.ts
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const users = client.db(process.env.DB_NAME).collection("Users");

  const password = bcrypt.hashSync("admin", 1);
  await users.insertOne({
    email: "admin",
    password: password,
    role: "admin",
  });

  return NextResponse.json({ success: true });
}
