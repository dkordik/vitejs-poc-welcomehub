import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      // use mkcert to create these, as described here: https://stackoverflow.com/a/69743888
      key: fs.readFileSync("./.cert/key.pem"),
      cert: fs.readFileSync("./.cert/cert.pem"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "init.welcome-hub-embedded.js"),
      name: "WelcomeHubEmbedded",
      fileName: () => 'init.welcome-hub-embedded.js',
    },
  },
});
