import { NextResponse } from "next/server";

export default function middleware(req) {
  const verify = req.cookies.get("7uDFVrhs6");
  const url = req.url;

  if (!verify && url.includes("/dashboard")) {
    const absoluteUrl = new URL("/admin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  if (!verify && url.includes("/dashboard/info")) {
    const absoluteUrl = new URL("/admin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  // if (!verify && url.includes("/registration")) {
  //   const absoluteUrl = new URL("/result", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteUrl.toString());
  // }

  if (verify && url.includes("/admin")) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}
