// Configuración propia del sitio. Antes salía de `@lovable.dev/vite-tanstack-config`, un envoltorio
// pensado para el editor de Lovable; esto es lo que de verdad hacía, sin lo del editor.
//
// Al construir (`npm run build`) Nitro genera un Worker de Cloudflare en `.output/`. El nombre del
// Worker, el dominio y la compatibilidad salen de `wrangler.jsonc`.
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // El servidor entra por src/server.ts (envuelve los errores de SSR con nuestra página).
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // Solo al construir: en desarrollo corre el servidor de Vite.
    ...(command === "build"
      ? [nitro({ preset: "cloudflare-module", cloudflare: { nodeCompat: true, deployConfig: true } })]
      : []),
    viteReact(),
  ],
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    // Una sola copia de React y de TanStack Query, o los hooks se rompen.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: { host: "::", port: 8080 },
}));
