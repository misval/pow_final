import { NavbarContent } from "@/components/ui/NavbarContent";

import Image from "next/image";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen">
      <aside className="hidden md:flex flex-col w-64 p-4 border-r">
        <NavbarContent />
      </aside>

      <div className="md:hidden m-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <NavbarContent />
          </SheetContent>
        </Sheet>
      </div>
      
      <h1 className="text-2xl font-bold p-4 mt-12">Home</h1>


      <div className="flex-1 overflow-auto w-full h-full justify-items-center content-center">  
        <Image src="/homeimg.jpg" alt="en construccion" width={300} height={300}/>
        <p>En construcción!</p>
      </div>
    </div>

    
  );
}
