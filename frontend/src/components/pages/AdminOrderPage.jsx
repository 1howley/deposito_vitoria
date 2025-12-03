import React, { useEffect, useState } from "react";
import { api } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../atoms/select";
import { OrderService } from "../../services/orders/OrderService";

export function AdminOrdersPage() {
    const { user, firebaseUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllOrders = async () => {
        try {
            const token = await firebaseUser.getIdToken();
            const response = await api.get("/orders/all?page=1&limit=50", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data.orders || []);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar pedidos admin.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === "ADMIN") {
            fetchAllOrders();
        }
    }, [user]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const token = await firebaseUser.getIdToken();
            await OrderService.updateStatus(orderId, newStatus, token);

            toast.success(`Pedido #${orderId} atualizado para ${newStatus}`);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderId === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar status");
        }
    };

    if (user?.role !== "ADMIN")
        return <div className="p-10">Acesso negado.</div>;

    return (
        <div className="container mx-auto p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Painel Administrativo - Pedidos
            </h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* WRAPPER PARA SCROLL HORIZONTAL */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left min-w-[700px]">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Cliente</th>
                                <th className="px-6 py-3">Data</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status Atual</th>
                                <th className="px-6 py-3">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.orderId}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        #{order.orderId}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">
                                            {order.user?.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {order.user?.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            order.orderedAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        R${" "}
                                        {Number(order.totalAmount).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-200 rounded text-xs font-bold">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Select
                                            onValueChange={(val) =>
                                                handleStatusUpdate(
                                                    order.orderId,
                                                    val
                                                )
                                            }
                                            defaultValue={order.status}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue placeholder="Alterar Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="PENDING">
                                                    Pendente
                                                </SelectItem>
                                                <SelectItem value="PAID">
                                                    Pago
                                                </SelectItem>
                                                <SelectItem value="PROCESSING">
                                                    Em Separação
                                                </SelectItem>
                                                <SelectItem value="SHIPPED">
                                                    Enviado
                                                </SelectItem>
                                                <SelectItem value="DELIVERED">
                                                    Entregue
                                                </SelectItem>
                                                <SelectItem value="CANCELLED">
                                                    Cancelado
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
