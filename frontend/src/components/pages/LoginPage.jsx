import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../atoms/card";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";

import { LoginForm } from "../organisms/login/LoginForm";
import { SignupForm } from "../organisms/login/SignUpForm";
import { LoginHeader } from "../../components/molecules/login/LoginHeader";
import { LoginBranding } from "../../components/molecules/login/LoginBranding";
import { SocialLogin } from "../../components/molecules/login/SocialLogin";

export function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // --- LÓGICA / HANDLERS ---
    const handleLogin = async (e) => {
        e.preventDefault();
        // ... sua lógica de login ...
        if (!loginEmail || !loginPassword) {
            toast.error("Preencha todos os campos");
            return;
        }
        // ... resto da lógica
        setIsLoading(true);
        setTimeout(() => {
            toast.success("Login realizado com sucesso!");
            setIsLoading(false);
            navigate("/");
        }, 1500);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        // ... sua lógica de signup ...
        if (
            !signupName ||
            !signupEmail ||
            !signupPassword ||
            !signupConfirmPassword
        ) {
            toast.error("Preencha todos os campos");
            return;
        }
        // ... resto da lógica
        setIsLoading(true);
        setTimeout(() => {
            toast.success("Conta criada com sucesso!");
            setIsLoading(false);
        }, 1500);
    };

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        // ... sua lógica do Google Auth ...
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

    // --- RENDERIZAÇÃO (VIEW) ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
            <LoginHeader onBackClick={() => navigate(-1)} />

            <div className="container mx-auto px-4 py-8 md:py-12 flex">
                <div className="max-w-sm mx-auto">
                    <LoginBranding />

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

                                <TabsContent value="login">
                                    <LoginForm
                                        handleLogin={handleLogin}
                                        loginEmail={loginEmail}
                                        setLoginEmail={setLoginEmail}
                                        loginPassword={loginPassword}
                                        setLoginPassword={setLoginPassword}
                                        isLoading={isLoading}
                                    />
                                </TabsContent>

                                <TabsContent value="signup">
                                    <SignupForm
                                        handleSignup={handleSignup}
                                        signupName={signupName}
                                        setSignupName={setSignupName}
                                        signupEmail={signupEmail}
                                        setSignupEmail={setSignupEmail}
                                        signupPassword={signupPassword}
                                        setSignupPassword={setSignupPassword}
                                        signupConfirmPassword={
                                            signupConfirmPassword
                                        }
                                        setSignupConfirmPassword={
                                            setSignupConfirmPassword
                                        }
                                        isLoading={isLoading}
                                    />
                                </TabsContent>
                            </Tabs>

                            <SocialLogin
                                onGoogleAuth={handleGoogleAuth}
                                isLoading={isLoading}
                            />

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

                    {/* <LoginBenefits /> */}
                    {/* Você pode mover os benefícios para seu próprio componente também */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        {/* ... */}
                    </div>
                </div>
            </div>
        </div>
    );
}
