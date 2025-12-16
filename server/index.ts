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
    .listen(3000);

console.log("🟢 Server running on http://localhost:3000");
