import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ProductService } from "../../services/products/ProductService";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card";
import { Label } from "../atoms/label";
import { Textarea } from "../atoms/textarea";

const AddProductPage = () => {
    const { user, firebaseUser } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        basePrice: "",
        stock: "",
        brand: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSubmit = {
                ...formData,
                basePrice: parseFloat(formData.basePrice),
                stock: parseInt(formData.stock, 10),
            };
            const token = await firebaseUser.getIdToken();
            console.log(token);
            await ProductService.create(dataToSubmit, token);
            alert("Product added successfully!");
            setFormData({
                name: "",
                description: "",
                basePrice: "",
                stock: "",
                brand: "",
                category: "",
            });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    if (user?.role !== "ADMIN") {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Você não está autorizado a ver essa página.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-full p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Adicionar novo produto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nome do Produto</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="basePrice">Preço</Label>
                            <Input
                                id="basePrice"
                                name="basePrice"
                                type="number"
                                value={formData.basePrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="stock">Estoque</Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="brand">Marca</Label>
                            <Input
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="category">Categoria</Label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="" disabled>
                                    Selecione uma categoria
                                </option>
                                <option value="Materiais Básicos">
                                    Materiais Básicos
                                </option>
                                <option value="Ferramentas">Ferramentas</option>
                                <option value="Tintas">Tintas</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full">
                            Adicionar Produto
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProductPage;
