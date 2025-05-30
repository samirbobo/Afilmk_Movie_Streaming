import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import fs from "fs";

// Plugin بسيط لنسخ ملف _redirects إلى dist بعد الـ build
function copyRedirects() {
  return {
    name: "copy-redirects",
    closeBundle() {
      fs.copyFileSync("public/_redirects", "dist/_redirects");
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: "gzip" }),
    copyRedirects(),
  ],
  build: {
    sourcemap: true,
  },
});
