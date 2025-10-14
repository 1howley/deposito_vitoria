import React from "react";
import { Button } from "../atoms/button";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const SocialButtons = () => {
    // Notei um pequeno erro de digitação aqui, corrigi de "CLick" para "Click" por consistência
    const handleFacebookClick = () => {
        window.open(
            "https://www.facebook.com/depositojardimvitoria/",
            "_blank"
        );
    };

    const handleInstagramClick = () => {
        window.open(
            "https://www.instagram.com/depositovitoriacajuru/",
            "_blank"
        );
    };

    const handleWhatsappClick = () => {
        window.open("https://wa.me/5537988311873", "_blank");
    };

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleFacebookClick}>
                <Facebook className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={handleInstagramClick}
            >
                <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleWhatsappClick}>
                <MessageCircle className="h-4 w-4" />
            </Button>
        </div>
    );
};

export { SocialButtons };
