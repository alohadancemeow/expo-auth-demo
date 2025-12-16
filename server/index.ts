import { Elysia } from "elysia";
import { auth } from "./lib/auth";
import { cors } from "@elysiajs/cors";

const app = new Elysia()

    // handle cors origin
    .use(cors())

    // Better Auth handler
    .all("/api/auth/*", ({ request }) => {
        return auth.handler(request);
    })
    .get("/", () => "Elysia + Better Auth API running")
    .listen({ port: 3000, hostname: '0.0.0.0' });

console.log("🟢 Server running on http://localhost:3000");
