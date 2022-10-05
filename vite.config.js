import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/bundle.js",
      fileName: "bundle",
      formats: ["es"],
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into the library.
      external: ["vue"],
    },
    sourcemap: false,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
    // Leave minification up to applications.
    minify: false,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => {
            // console.log("tag:", tag);
            return tag.includes("vbr-");
          },
        },
      },
      customElement: true,
    }),
  ],
});
