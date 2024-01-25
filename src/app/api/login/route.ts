import {NextResponse} from "next/server";

const headers = {
  'Content-Type': 'application/json',
}

export async function POST(request: Request) {
  const cred: { email: string, password: string } = await request.json()
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify(cred)
    })
    if (res.status !== 200) {
      return new NextResponse(JSON.stringify({
        message: "Failed to connect"
      }), {status: res.status})
    }
    const data = await res.json()
    const response = new NextResponse(JSON.stringify(data))
    const cookie = res.headers.getSetCookie()
    if (cookie[0]) response.headers.append('set-cookie', cookie[0])

    return response
  } catch (err: any) {
    console.error(err)
    return new NextResponse(JSON.stringify({
      message: "Internal server error"
    }), {status: 500})
  }
}