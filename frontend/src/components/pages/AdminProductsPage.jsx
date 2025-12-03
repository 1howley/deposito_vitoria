import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ProductService } from "../../services/products/ProductService";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card";
import { Label } from "../atoms/label";
import { Textarea } from "../atoms/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../atoms/table";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";

export function AdminProductsPage() {
    const { user, firebaseUser } = useAuth();
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialForm = {
        name: "",
        description: "",
        basePrice: "",
        stock: "",
        brand: "",
        category: "",
    };
    const [formData, setFormData] = useState(initialForm);

    // Carregar produtos
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getAll();
            setProducts(data.products || []);
        } catch (error) {
            toast.error("Erro ao carregar produtos: " + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === "ADMIN") fetchProducts();
    }, [user]);

    // Manipular formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await firebaseUser.getIdToken();
            const payload = {
                ...formData,
                basePrice: parseFloat(formData.basePrice),
                stock: parseInt(formData.stock, 10),
            };

            if (isEditing) {
                await ProductService.update(editingId, payload, token);
                toast.success("Produto atualizado!");
            } else {
                await ProductService.create(payload, token);
                toast.success("Produto criado!");
            }

            setFormData(initialForm);
            setIsEditing(false);
            setEditingId(null);
            fetchProducts(); // Recarrega a lista
        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar produto.");
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description || "",
            basePrice: product.basePrice,
            stock: product.stock,
            brand: product.brand || "",
            category: product.category || "",
        });
        setEditingId(product.productId);
        setIsEditing(true);
        // Scroll para o topo onde está o formulário
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;
        try {
            const token = await firebaseUser.getIdToken();
            await ProductService.delete(id, token);
            toast.success("Produto excluído.");
            fetchProducts();
        } catch (error) {
            toast.error("Erro ao excluir: " + error);
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData(initialForm);
    };

    if (user?.role !== "ADMIN")
        return <div className="p-10 text-center">Acesso Negado</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8">Gestão de Produtos</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Formulário (Lado Esquerdo ou Topo) */}
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>
                            {isEditing
                                ? "Editar Produto"
                                : "Adicionar Novo Produto"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>Nome</Label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Descrição</Label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>Preço (R$)</Label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        name="basePrice"
                                        value={formData.basePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Estoque</Label>
                                    <Input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>Marca</Label>
                                    <Input
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label>Categoria</Label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Materiais Básicos">
                                            Materiais Básicos
                                        </option>
                                        <option value="Ferramentas">
                                            Ferramentas
                                        </option>
                                        <option value="Tintas">Tintas</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button type="submit" className="flex-1">
                                    {isEditing
                                        ? "Salvar Alterações"
                                        : "Criar Produto"}
                                </Button>
                                {isEditing && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={cancelEdit}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Lista de Produtos (Lado Direito ou Baixo) */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>
                            Lista de Produtos ({products.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-auto max-h-[600px]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Categoria</TableHead>
                                        <TableHead>Preço</TableHead>
                                        <TableHead>Estoque</TableHead>
                                        <TableHead className="text-right">
                                            Ações
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.productId}>
                                            <TableCell className="font-medium">
                                                {product.name}
                                            </TableCell>
                                            <TableCell>
                                                {product.category}
                                            </TableCell>
                                            <TableCell>
                                                R${" "}
                                                {Number(
                                                    product.basePrice
                                                ).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={
                                                        product.stock < 5
                                                            ? "text-red-500 font-bold"
                                                            : ""
                                                    }
                                                >
                                                    {product.stock}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            handleEdit(product)
                                                        }
                                                    >
                                                        <Edit className="w-4 h-4 text-blue-500" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            handleDelete(
                                                                product.productId
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
