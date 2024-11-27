import { NavbarContent } from "@/components/ui/NavbarContent";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen">
      <aside className="hidden md:flex flex-col w-64 p-4 border-r">
        <NavbarContent />
      </aside>
      
      <h1 className="text-2xl font-bold p-4 mt-12">Home</h1>


      <div className="flex-1 overflow-auto w-full h-full justify-items-center content-center">  
        <Image src="/homeimg.jpg" alt="en construccion" width={300} height={300}/>
        <p>En construcción!</p>
      </div>
    </div>

    
  );
}
