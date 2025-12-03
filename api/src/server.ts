import Fastify from "fastify";
import cors from "@fastify/cors";
import { UserRoute } from "./routes/UserRoute.js";
import { ProductRoute } from "./routes/ProductRoute.js";
import { AddressRoute } from "./routes/AddressRoute.js";
import { CartRoute } from "./routes/CartRoute.js";
import { PaymentRoute } from "./routes/PaymentRoute.js";
import { OrderRoute } from "./routes/OrderRoute.js";
import { OrderItemRoute } from "./routes/OrderItemRoute.js";
import { CartItemRoute } from "./routes/CartItemRoute.js";
import { WebhookRoute } from "./routes/WebhookRoute.js";

const server = Fastify({ logger: true });

const startServer = async () => {

    await server.register(cors, {
        origin: true, // Permite todas as origens (em dev)
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });

    await server.register(UserRoute, { prefix: "users" });
    await server.register(ProductRoute, { prefix: "products" });
    await server.register(AddressRoute, { prefix: "addresses" });
    await server.register(CartRoute, { prefix: "carts" });
    await server.register(PaymentRoute, { prefix: "payments" });
    await server.register(OrderRoute, { prefix: "orders" });
    await server.register(OrderItemRoute, { prefix: "order-items" });
    await server.register(CartItemRoute, { prefix: "cart-items" });
    await server.register(WebhookRoute, { prefix: "webhooks" });

    try {
        await server.listen({
            port: 3000,
            host: "0.0.0.0",
        });
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

startServer();
