import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";

// --- Importação do seu Service ---
import { setUser } from "../../services/users/UserService"; // <-- Importar (ajuste o caminho)

// --- Seus Componentes de UI ---
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../atoms/card";
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

    const syncUserWithBackend = async (
        firebaseUser,
        provider,
        extraData = {}
    ) => {
        const userDataForBackend = {
            userId: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || extraData.name,
            role: "ADMIN", // Pega o nome do Google ou do formulário
            authProvider: provider, // 'google' or 'email'
        };

        try {
            const data = await setUser(userDataForBackend);
            //console.log("Usuário sincronizado com o backend:", data);
            return true;
        } catch (error) {
            console.error("Falha ao sincronizar usuário com o backend:", error);
            toast.error("Erro crítico ao salvar dados do usuário.");
            return false;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            toast.error("Preencha todos os campos");
            return;
        }

        setIsLoading(true);
        try {
            // Passo 1: Logar no Firebase
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );

            const firebaseUser = userCredentials.user;

            const syncSuccess = await syncUserWithBackend(
                firebaseUser,
                "email"
            );
            // Passo 2: Sucesso!
            if (syncSuccess) {
                // Passo 3: Sucesso!
                toast.success("Login realizado com sucesso!");
                navigate("/"); // Redireciona para a home
            } else {
                // Se o sync falhar, é melhor não deixar o usuário prosseguir
                // (Isso é uma decisão de negócios, mas geralmente é mais seguro)
                toast.error("Erro ao verificar dados do usuário.");
                // Opcional: deslogar do firebase se o sync com backend for crítico
                // await auth.signOut();
            }
        } catch (error) {
            console.error("Erro no login:", error.code);
            if (
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
            ) {
                toast.error("Email ou senha inválidos.");
            } else {
                toast.error("Erro ao tentar fazer login.");
            }
        } finally {
            setIsLoading(false);
        }
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
        if (signupPassword !== signupConfirmPassword) {
            toast.error("As senhas não conferem.");
            return;
        }

        setIsLoading(true);
        try {
            // Passo 1: Criar usuário no Firebase
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                signupEmail,
                signupPassword
            );
            const firebaseUser = userCredential.user;

            // Passo 2: Sincronizar usuário com nosso backend
            const syncSuccess = await syncUserWithBackend(
                firebaseUser,
                "email",
                { name: signupName }
            );

            if (syncSuccess) {
                toast.success("Conta criada com sucesso!");
                navigate("/"); // Redireciona para a home
            }
        } catch (error) {
            console.error("Erro no cadastro:", error.code);
            if (error.code === "auth/email-already-in-use") {
                toast.error("Este email já está em uso.");
            } else {
                toast.error("Erro ao criar conta.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            // Passo 1: Logar/Criar usuário com Google no Firebase
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;

            // Passo 2: Sincronizar usuário com nosso backend ("encontre ou crie")
            const syncSuccess = await syncUserWithBackend(
                firebaseUser,
                "google"
            );

            if (syncSuccess) {
                toast.success(`Bem-vindo, ${firebaseUser.displayName}!`);
                navigate("/");
            }
        } catch (error) {
            console.error("Erro na autenticação com o Google:", error);
            if (error.code !== "auth/popup-closed-by-user") {
                toast.error("Falha na autenticação com o Google.");
            }
        } finally {
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
