// AuthProvider.jsx

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";
// Importe a função que busca/sincroniza o usuário com seu backend
// Esta função deve retornar o objeto do usuário (com role)
import { getUserFromBackend } from "../services/users/UserService";
import { toast } from "sonner"; // Para feedback de erro

export function AuthProvider({ children }) {
    // user: objeto do Firebase (uid, email, displayName)
    const [firebaseUser, setFirebaseUser] = useState(null);

    // userFromBackend: objeto do backend (userId, email, name, role)
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (userFromFirebase) => {
                setFirebaseUser(userFromFirebase);

                if (userFromFirebase) {
                    // Usuário logado no Firebase, AGORA buscamos a role no backend
                    try {
                        // Chame a API de backend com o UID do Firebase
                        const backendUser = await getUserFromBackend(
                            userFromFirebase.uid
                        );

                        // Armazenamos o usuário COMPLETO (com a role)
                        setUser(backendUser);
                    } catch (error) {
                        console.error(
                            "Falha ao buscar role do backend:",
                            error
                        );
                        toast.error("Erro ao carregar perfil do usuário.");
                        setUser(null); // Reseta se falhar
                    }
                } else {
                    // Usuário deslogado
                    setUser(null);
                }

                setLoading(false);
            }
        );

        return unsubscribe;
    }, []); // O useEffect roda apenas na montagem e desmontagem

    // O valor do contexto AGORA expõe o 'user' com a role do backend
    const value = { user, loading, firebaseUser };

    return (
        <AuthContext.Provider value={value}>
            {/* Renderiza apenas quando a autenticação e a busca do backend terminarem */}
            {!loading && children}
        </AuthContext.Provider>
    );
}
