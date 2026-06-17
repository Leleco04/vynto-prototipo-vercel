import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Injetando o preset do Vercel dentro do objeto vite aceito pelo Lovable
  vite: {
    plugins: [
      nitro({
        preset: "vercel",
      }),
    ],
  },
});
