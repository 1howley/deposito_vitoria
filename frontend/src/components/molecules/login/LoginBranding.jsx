export function LoginBranding() {
    return (
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
            <h1 className="text-3xl mb-2">Depósito Vitória Cajuru</h1>
            <p className="text-muted-foreground">
                Acesse sua conta ou crie uma nova
            </p>
        </div>
    );
}
