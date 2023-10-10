import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  console.log("I am here! "+ query);
//   return Response.json("qwerty")
  return NextResponse.json("qwerty")
}
