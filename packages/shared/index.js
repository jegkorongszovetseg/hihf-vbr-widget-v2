const modules = import.meta.glob('./assets/icons/*.svg');

for (const path in modules) {
  modules[path]();
}
