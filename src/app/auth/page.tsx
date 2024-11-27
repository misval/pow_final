'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../../../firebase-config';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const auth = getAuth(app);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    
    const email = (event.target as any).email.value
    const password = (event.target as any).password.value

    try {
      signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      console.log("error al registrarse", err)
    } finally {
      setIsLoading(false)
    }

    setTimeout(() => setIsLoading(false), 2000) // Simulación de carga
  }

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    
    const email = (event.target as any).email.value
    const password = (event.target as any).password.value

    try {
      createUserWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      console.log("error al registrarse", err)
    } finally {
      setIsLoading(false)
    }

    setTimeout(() => setIsLoading(false), 2000) // Simulación de carga
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle >Rimoldi Administrator</CardTitle>
          <CardDescription>Inicia sesión o crea una cuenta para continuar</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
            </TabsList>
           
           <TabsContent value="login">
              <form onSubmit={handleLogin} className="mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="mt-4">
                <div className="grid gap-4">
                  {/* <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" type="text" required />
                  </div> */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Crear Cuenta"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>

        </CardContent>
        
      </Card>
    </div>
  )
}