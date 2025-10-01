import Fastify from "fastify";
import cors from "@fastify/cors";

const server = Fastify({ logger: true })

const startServer = async () => {
    try {
        await server.listen({ port: 3000 })
    } catch (error) {
        
    }
}