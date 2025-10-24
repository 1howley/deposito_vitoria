import { Mail, Lock, User } from "lucide-react";
import { Button } from "../../atoms/button";
import { FormField } from "../../molecules/FormField";
import { toast } from "sonner";

export function SignupForm({
    handleSignup,
    signupName,
    setSignupName,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupConfirmPassword,
    setSignupConfirmPassword,
    isLoading,
}) {
    return (
        <form onSubmit={handleSignup} className="space-y-4">
            <FormField
                id="signup-name"
                label="Nome Completo"
                type="text"
                placeholder="João Silva"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                disabled={isLoading}
                icon={User}
            />

            <FormField
                id="signup-email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                disabled={isLoading}
                icon={Mail}
            />

            <FormField
                id="signup-password"
                label="Senha"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                disabled={isLoading}
                icon={Lock}
            />

            <FormField
                id="signup-confirm"
                label="Confirmar Senha"
                type="password"
                placeholder="Digite a senha novamente"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                disabled={isLoading}
                icon={Lock}
            />

            <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 rounded" required />
                <span className="text-muted-foreground">
                    Aceito os{" "}
                    <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => toast.info("Termos em desenvolvimento")}
                    >
                        termos de uso
                    </button>{" "}
                    e{" "}
                    <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() =>
                            toast.info("Política em desenvolvimento")
                        }
                    >
                        política de privacidade
                    </button>
                </span>
            </div>

            <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
            >
                {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
        </form>
    );
}
