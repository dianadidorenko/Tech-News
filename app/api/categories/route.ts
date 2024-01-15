import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong");
  }
}
