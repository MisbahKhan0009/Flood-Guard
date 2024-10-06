// @ts-nocheck

import { Toaster } from "sonner";
import { router } from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <section className="bg-secondary font-nunito ">
      <RouterProvider router={router} />
      <Toaster richColors />
    </section>
  );
}

export default App;
