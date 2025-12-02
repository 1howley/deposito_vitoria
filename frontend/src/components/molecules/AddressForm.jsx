import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import { Card } from "../atoms/card";
import { Truck } from "lucide-react";

export function AddressForm({ deliveryInfo, onChange }) {
    return (
        <div className="space-y-6">
            {/* Dados Pessoais */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">1</span>
                    </div>
                    <h2 className="text-xl">Dados Pessoais</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                            id="name"
                            value={deliveryInfo.name}
                            onChange={(e) => onChange("name", e.target.value)}
                            placeholder="Seu nome completo"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={deliveryInfo.email}
                            onChange={(e) => onChange("email", e.target.value)}
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                            id="phone"
                            value={deliveryInfo.phone}
                            onChange={(e) => onChange("phone", e.target.value)}
                            placeholder="(00) 00000-0000"
                        />
                    </div>
                    {/* DICA: Para gateways de pagamento no Brasil, adicione CPF aqui */}
                    <div className="md:col-span-2">
                        <Label htmlFor="document">
                            CPF (Necessário para PIX/Boleto) *
                        </Label>
                        <Input
                            id="document"
                            value={deliveryInfo.document || ""}
                            onChange={(e) =>
                                onChange("document", e.target.value)
                            }
                            placeholder="000.000.000-00"
                        />
                    </div>
                </div>
            </Card>

            {/* Endereço */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl">Endereço de Entrega</h2>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                    {/* ... Inputs de endereço (CEP, Rua, Número, etc) mantendo a mesma lógica ... */}
                    <div className="md:col-span-1">
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                            id="zipCode"
                            value={deliveryInfo.zipCode}
                            onChange={(e) =>
                                onChange("zipCode", e.target.value)
                            }
                            placeholder="00000-000"
                        />
                    </div>
                    <div className="md:col-span-3">
                        <Label htmlFor="address">Endereço *</Label>
                        <Input
                            id="address"
                            value={deliveryInfo.address}
                            onChange={(e) =>
                                onChange("address", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-1">
                        <Label htmlFor="number">Número *</Label>
                        <Input
                            id="number"
                            value={deliveryInfo.number}
                            onChange={(e) => onChange("number", e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-1">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                            id="complement"
                            value={deliveryInfo.complement}
                            onChange={(e) =>
                                onChange("complement", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                            id="neighborhood"
                            value={deliveryInfo.neighborhood}
                            onChange={(e) =>
                                onChange("neighborhood", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                            id="city"
                            value={deliveryInfo.city}
                            onChange={(e) => onChange("city", e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-1">
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                            id="state"
                            value={deliveryInfo.state}
                            onChange={(e) => onChange("state", e.target.value)}
                            maxLength={2}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}
