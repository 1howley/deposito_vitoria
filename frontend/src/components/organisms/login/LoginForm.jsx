import { Mail, Lock } from "lucide-react";
import { Button } from "../../atoms/button";
import { FormField } from "../../molecules/FormField";
import { toast } from "sonner";

export function LoginForm({
    handleLogin,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    isLoading,
}) {
    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <FormField
                id="login-email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                disabled={isLoading}
                icon={Mail}
            />

            <FormField
                id="login-password"
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={isLoading}
                icon={Lock}
            />

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Lembrar-me</span>
                </label>
                <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() =>
                        toast.info("Funcionalidade em desenvolvimento")
                    }
                >
                    Esqueceu a senha?
                </button>
            </div>

            <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
            >
                {isLoading ? "Entrando..." : "Entrar"}
            </Button>
        </form>
    );
}
