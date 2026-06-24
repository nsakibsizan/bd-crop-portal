import { NextResponse } from "next/server";
import fertilizers from "@/public/data/json/fertilizers.json";

export async function GET() {
  return NextResponse.json(fertilizers);
}