import {NextResponse} from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/csrf-token`, {
      credentials: 'include'
    })
    if (res.status !== 200) {
      return new NextResponse(JSON.stringify({
        message: "Failed to connect"
      }), {status: res.status})
    }

    const cookie = res.headers.getSetCookie()
    const token = cookie[0].split(";")[0].split("=")[1]
    const response = new NextResponse(JSON.stringify({token}))
    if (cookie[0]) response.headers.append('set-cookie', cookie[0])

    return response
  } catch (err) {
    return new NextResponse(JSON.stringify({
      message: "Failed to connect"
    }), {status: 500})
  }
}