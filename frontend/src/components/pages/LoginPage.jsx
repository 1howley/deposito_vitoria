import { useState } from "react";
import { ArrowLeft, Mail, Lock, User, Chrome } from "lucide-react";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../atoms/card";
import { Separator } from "../atoms/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";

export function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginEmail || !loginPassword) {
            toast.error("Preencha todos os campos");
            return;
        }

        if (!loginEmail.includes("@")) {
            toast.error("Email inválido");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Login realizado com sucesso!");
            setIsLoading(false);
            // Here you would integrate with real authentication
        }, 1500);

        navigate("/");
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (
            !signupName ||
            !signupEmail ||
            !signupPassword ||
            !signupConfirmPassword
        ) {
            toast.error("Preencha todos os campos");
            return;
        }

        if (!signupEmail.includes("@")) {
            toast.error("Email inválido");
            return;
        }

        if (signupPassword.length < 6) {
            toast.error("A senha deve ter no mínimo 6 caracteres");
            return;
        }

        if (signupPassword !== signupConfirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Conta criada com sucesso!");
            setIsLoading(false);
            // Here you would integrate with real authentication
        }, 1500);
    };

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        toast.info("Redirecionando para autenticação do Google...");

        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário autenticado:", user);
            toast.success(`Bem-vindo, ${user.displayName || "usuário"}!`);
            setIsLoading(false);
            //navigate("/");
        } catch (error) {
            console.error("Erro na autenticação com o Google:", error);
            toast.error("Falha na autenticação com o Google.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Voltar</span>
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8 md:py-12 flex">
                <div className="max-w-sm mx-auto">
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-4 bg-primary rounded-2xl mb-4 shadow-lg">
                            <svg
                                className="w-12 h-12 text-primary-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl mb-2">
                            Depósito Vitória 
                        </h1>
                        <p className="text-muted-foreground">
                            Acesse sua conta ou crie uma nova
                        </p>
                    </div>

                    {/* Auth Card */}
                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle>Bem-vindo!</CardTitle>
                            <CardDescription>
                                Entre com sua conta ou cadastre-se gratuitamente
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="login" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="login">
                                        Login
                                    </TabsTrigger>
                                    <TabsTrigger value="signup">
                                        Criar Conta
                                    </TabsTrigger>
                                </TabsList>

                                {/* Login Tab */}
                                <TabsContent value="login">
                                    <form
                                        onSubmit={handleLogin}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="login-email">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="login-email"
                                                    type="email"
                                                    placeholder="seu@email.com"
                                                    value={loginEmail}
                                                    onChange={(e) =>
                                                        setLoginEmail(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="login-password">
                                                Senha
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="login-password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={loginPassword}
                                                    onChange={(e) =>
                                                        setLoginPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="rounded"
                                                />
                                                <span className="text-muted-foreground">
                                                    Lembrar-me
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                className="text-primary hover:underline"
                                                onClick={() =>
                                                    toast.info(
                                                        "Funcionalidade em desenvolvimento"
                                                    )
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
                                            {isLoading
                                                ? "Entrando..."
                                                : "Entrar"}
                                        </Button>
                                    </form>
                                </TabsContent>

                                {/* Signup Tab */}
                                <TabsContent value="signup">
                                    <form
                                        onSubmit={handleSignup}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-name">
                                                Nome Completo
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-name"
                                                    type="text"
                                                    placeholder="João Silva"
                                                    value={signupName}
                                                    onChange={(e) =>
                                                        setSignupName(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="signup-email">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-email"
                                                    type="email"
                                                    placeholder="seu@email.com"
                                                    value={signupEmail}
                                                    onChange={(e) =>
                                                        setSignupEmail(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="signup-password">
                                                Senha
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-password"
                                                    type="password"
                                                    placeholder="Mínimo 6 caracteres"
                                                    value={signupPassword}
                                                    onChange={(e) =>
                                                        setSignupPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="signup-confirm">
                                                Confirmar Senha
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-confirm"
                                                    type="password"
                                                    placeholder="Digite a senha novamente"
                                                    value={
                                                        signupConfirmPassword
                                                    }
                                                    onChange={(e) =>
                                                        setSignupConfirmPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                className="mt-1 rounded"
                                                required
                                            />
                                            <span className="text-muted-foreground">
                                                Aceito os{" "}
                                                <button
                                                    type="button"
                                                    className="text-primary hover:underline"
                                                    onClick={() =>
                                                        toast.info(
                                                            "Termos em desenvolvimento"
                                                        )
                                                    }
                                                >
                                                    termos de uso
                                                </button>{" "}
                                                e{" "}
                                                <button
                                                    type="button"
                                                    className="text-primary hover:underline"
                                                    onClick={() =>
                                                        toast.info(
                                                            "Política em desenvolvimento"
                                                        )
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
                                            {isLoading
                                                ? "Criando conta..."
                                                : "Criar Conta"}
                                        </Button>
                                    </form>
                                </TabsContent>
                            </Tabs>

                            {/* Separator */}
                            <div className="my-6 flex items-center gap-3">
                                <Separator
                                    aria-hidden="true"
                                    className="flex-1"
                                />
                                <span className="px-2 text-sm text-muted-foreground bg-card">
                                    ou continue com
                                </span>
                                <Separator
                                    aria-hidden="true"
                                    className="flex-1"
                                />
                            </div>

                            {/* Google Button */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                size="lg"
                                onClick={handleGoogleAuth}
                                disabled={isLoading}
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                {isLoading
                                    ? "Conectando..."
                                    : "Continuar com Google"}
                            </Button>

                            {/* Footer info */}
                            <p className="text-center text-sm text-muted-foreground mt-6">
                                Ao criar uma conta, você concorda com nossos{" "}
                                <button
                                    type="button"
                                    className="text-primary hover:underline"
                                    onClick={() =>
                                        toast.info("Termos em desenvolvimento")
                                    }
                                >
                                    Termos de Serviço
                                </button>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Benefits */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="inline-block p-3 bg-primary/10 rounded-full mb-2">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm">Compra rápida</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="inline-block p-3 bg-accent/10 rounded-full mb-2">
                                <svg
                                    className="w-6 h-6 text-accent"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm">Histórico de pedidos</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="inline-block p-3 bg-destructive/10 rounded-full mb-2">
                                <svg
                                    className="w-6 h-6 text-destructive"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm">Ofertas exclusivas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
