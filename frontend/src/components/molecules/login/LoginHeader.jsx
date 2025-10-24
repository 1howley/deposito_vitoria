import { ArrowLeft } from "lucide-react";
import { Button } from "../../atoms/button";

export function LoginHeader({ onBackClick }) {
    return (
        <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <Button variant="ghost" onClick={onBackClick}>
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Voltar</span>
                </Button>
            </div>
        </div>
    );
}
