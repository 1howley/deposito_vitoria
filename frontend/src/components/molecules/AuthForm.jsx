import React from 'react';
import { Button } from '../atoms/button'; // Ajuste o caminho se necessário
import { Input } from '../atoms/input';   // Ajuste o caminho se necessário
import { Label } from '../atoms/label';   // Ajuste o caminho se necessário
import { Checkbox } from '../atoms/checkbox'; // Assumindo que você tem um componente de checkbox
import { Chrome } from 'lucide-react';

/**
 * Molécula para o formulário de login.
 */
export function AuthForm() {
  return (
    <div className="w-full lg:w-1/2 p-8 md:p-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
      
      <div className="space-y-5">
        <div>
          <Label htmlFor="email">Username or email</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
      </div>

      <div className="flex items-center justify-between my-6">
        <div className="flex items-center space-x-2">
          {/* Você precisará de um componente Checkbox */}
          <Checkbox id="remember-me" /> 
          <Label htmlFor="remember-me" className="text-sm font-medium text-gray-600">
            Remember me
          </Label>
        </div>
        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-800">
          Forgot password?
        </a>
      </div>

      <div className="space-y-4">
        <Button className="w-full bg-purple-600 hover:bg-purple-700">Sign In</Button>
        <Button variant="outline" className="w-full">
          <Chrome className="w-4 h-4 mr-2" />
          Sign in with Google
        </Button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        New here?{' '}
        <a href="#" className="font-semibold text-purple-600 hover:text-purple-800">
          Create an Account
        </a>
      </p>
    </div>
  );
}