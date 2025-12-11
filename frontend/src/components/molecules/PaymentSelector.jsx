import { Card } from "../atoms/card";
import { Badge } from "../atoms/badge";
import { CreditCard } from "lucide-react";

export function PaymentSelector({ selectedMethod, onSelect }) {
    const methods = [
        {
            id: "pix",
            label: "PIX",
            sub: "Pagamento instantâneo",
            discount: "5% de desconto",
        },
        // Removido objeto do "card"
        // Removido objeto do "boleto"
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl">Forma de Pagamento</h2>
            </div>

            <div className="space-y-3">
                {methods.map((method) => (
                    <div
                        key={method.id}
                        onClick={() => onSelect(method.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedMethod === method.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedMethod === method.id
                                            ? "border-primary"
                                            : "border-border"
                                    }`}
                                >
                                    {selectedMethod === method.id && (
                                        <div className="w-3 h-3 bg-primary rounded-full" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {method.label}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {method.sub}
                                    </p>
                                </div>
                            </div>
                            {method.discount && (
                                <Badge variant="secondary">
                                    {method.discount}
                                </Badge>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
