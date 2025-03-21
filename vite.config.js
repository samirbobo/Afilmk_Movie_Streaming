import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // لتقسيم ملفات الجاف سكريبت في مرحله البناء بتخلي ملفات المشروع في ملف واحد وملفات المكتبات المضافه في ملف واحد
  // ودا بيحسن من جوده الموقع و بيخليه اسرع وافضل
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // تحميل مكتبات الطرف الثالث بشكل منفصل
          }
        },
      },
    },
  },
});
