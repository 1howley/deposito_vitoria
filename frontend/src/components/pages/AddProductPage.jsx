
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ProductService } from '../../services/products/ProductService';
import { Input } from '../atoms/input';
import { Button } from '../atoms/button';
import { Card, CardContent, CardHeader, CardTitle } from '../atoms/card';
import { Label } from '../atoms/label';
import { Textarea } from '../atoms/textarea';

const AddProductPage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        basePrice: '',
        stock: '',
        brand: '',
        category: '',
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
            await ProductService.create(formData);
            alert('Product added successfully!');
            setFormData({
                name: '',
                description: '',
                basePrice: '',
                stock: '',
                brand: '',
                category: '',
            });
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product.');
        }
    };

    if (user?.role !== 'ADMIN') {
        return (
            <div className="flex items-center justify-center h-full">
                <p>You are not authorized to view this page.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-full p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="basePrice">Price</Label>
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
                            <Label htmlFor="stock">Stock</Label>
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
                            <Label htmlFor="brand">Brand</Label>
                            <Input
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" className="w-full">Add Product</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProductPage;
