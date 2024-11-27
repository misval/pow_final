import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, FileText, Building, LogOut } from "lucide-react"

import Link from "next/link"

import Image from "next/image"

export const NavbarContent = () => (
  <nav className="flex flex-col h-full">
    <Image
        src="/rimoldi-logo.png"
        alt="logo rimoldi"
        width={100}
        height={80}
        className="self-center"
      />
    <div className="mt-6 space-y-4 flex-grow">
      <Link href='/'>
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Inicio
        </Button>
      </Link>

      <Link href='/contratos'>
        <Button variant="ghost" className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Contratos
        </Button>
      </Link>
    
      <Link href='/propiedades'>
        <Button variant="ghost" className="w-full justify-start">
          <Building className="mr-2 h-4 w-4" />
          Propiedades
        </Button>
      </Link>
    </div>
    <div className="mt-auto pt-4 border-t">
      <div className="flex items-center mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">Nombre Usuario</p>
          <p className="text-xs text-muted-foreground">Administrador</p>
        </div>
      </div>
      <Button variant="outline" className="w-full justify-center">
        <LogOut className="mr-2 h-4 w-4" />
        Cerrar sesión
      </Button>
    </div>
  </nav>
)