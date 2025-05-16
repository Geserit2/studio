"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Logic to check if consent has already been given (e.g., from localStorage)
    // For this placeholder, we'll just show it by default after a short delay
    const timer = setTimeout(() => {
      // Example: if (!localStorage.getItem('cookie_consent')) {
        setIsVisible(true);
      // }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    // Logic to save consent (e.g., to localStorage)
    // localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Logic for declining cookies
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-background/95 p-4 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-start text-sm text-foreground">
          <Cookie className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
          <p>
            Wir verwenden Cookies, um Ihr Nutzererlebnis zu verbessern. Durch die weitere Nutzung unserer Webseite stimmen Sie der Verwendung von Cookies zu.
            Weitere Informationen finden Sie in unserer <a href="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</a>.
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-3">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Ablehnen
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
