// @ts-nocheck

import { Toaster } from "sonner";
import { router } from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

function App() {
  return (
    <BackgroundBeamsWithCollision className="-z-50">
      <section className="bg-secondary font-nunito ">
        <RouterProvider router={router} />
        <Toaster />
      </section>
    </BackgroundBeamsWithCollision>
  );
}

export default App;
