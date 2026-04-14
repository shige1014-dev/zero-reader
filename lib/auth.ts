import { NextResponse } from "next/server";

export function getPushSecret() {
  return process.env.PUSH_SECRET ?? "local-dev-secret";
}

export function authorizePush(request: Request) {
  const header = request.headers.get("authorization");
  const expected = `Bearer ${getPushSecret()}`;

  if (header !== expected) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401
      }
    );
  }

  return null;
}
