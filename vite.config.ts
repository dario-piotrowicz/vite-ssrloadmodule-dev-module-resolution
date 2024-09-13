import { defineConfig, type ViteDevServer } from "vite";
import type * as http from "node:http";

export default defineConfig({
  appType: "custom",
  ssr: {
    target: "webworker",
  },
  optimizeDeps: {
    include: [],
  },
  plugins: [
    {
      name: "vite-ssr-dev-module-resolution",
      async configureServer(server: ViteDevServer) {
        return async () => {
          server.middlewares.use(
            async (_req: http.IncomingMessage, res: http.ServerResponse) => {
              const { json } = await server.ssrLoadModule("./entry-server.ts");
              res.end(JSON.stringify(json));
            }
          );
        };
      },
    },
  ],
});
