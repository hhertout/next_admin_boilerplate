import {NextResponse} from "next/server";

export async function GET(request: Request) {

  const res = await fetch(`${process.env.BACKEND_URL}/api/logout`, {
    headers: {
      cookie : request.headers.get("cookie") ?? ""
    } ,
    credentials: "include"
  })

  if (res.status === 200) {
    const response = new NextResponse(JSON.stringify({
      message: "Successfully logged out"
    }))
    const cookie = res.headers.getSetCookie()
    if (cookie[0]) response.headers.append('set-cookie', cookie[0])

    return response
  } else {
    return new NextResponse(JSON.stringify({
      message: "Successfully logged out"
    }), {status: 500})
  }
}