"use server";

import loginSchema from "./schema";
import { LoginFormState } from "./login-form";
import { cookies } from "next/headers";
import { parse } from "cookie";

type LoginFetchResponse = {
  status: number;
  error: string;
};

export async function login(
  _: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const { data, error, success } = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!success) {
    return { type: "error", errors: error.errors.map(err => err.message) };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const response: LoginFetchResponse = await res.json();
    if (res.status !== 200) {
      console.error(response.error);
      return { type: "error", errors: [response.error] };
    }

    const cookie = res.headers.get("set-cookie");
    if (!cookie) {
      console.error("The server did not return a cookie");
      return { type: "error", errors: ["No cookie found"] };
    }

    const parsedCookie = parse(cookie);
    cookies().set("Authorization", parsedCookie.Authorization, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(parsedCookie.Expires),
    });

    return { type: "success" };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) return { type: "error", errors: [err.message] };
    return { type: "error", errors: ["Unknow error"] };
  }
}
