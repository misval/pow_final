import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, FileText, Building, LogOut } from "lucide-react"


export const NavbarContent = () => (
  <nav className="flex flex-col h-full">
    <div className="space-y-4 flex-grow">
      <Button variant="ghost" className="w-full justify-start">
        <Home className="mr-2 h-4 w-4" />
        Inicio
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <FileText className="mr-2 h-4 w-4" />
        Contratos
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <Building className="mr-2 h-4 w-4" />
        Propiedades
      </Button>
    </div>
    <div className="mt-auto pt-4 border-t">
      <div className="flex items-center mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">Carlos Nombre</p>
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