import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes.js";

const server = Fastify({ logger: true });

const startServer = async () => {
    await server.register(cors);
    await server.register(routes);

    try {
        await server.listen({ 
            port: 3000,
            host: "0.0.0.0"
        });
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

startServer();
