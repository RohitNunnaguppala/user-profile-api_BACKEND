import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

interface DecodedToken {
  userId: string
}

export async function getAuthUser(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as DecodedToken

    return { userId: decoded.userId }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

export function getAuthMiddleware() {
  return async (request: NextRequest) => {
    const authUser = await getAuthUser(request)
    if (!authUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
    return null
  }
}

