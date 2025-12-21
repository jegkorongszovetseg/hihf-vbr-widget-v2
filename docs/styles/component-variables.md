---
outline: deep
---

# Komponens CSS Változók

Lehetséges az egyes összetevők egyedi beállítása is.
Minden komponenshez tartozó CSS változók a `@layer components.variables` blokkban találhatók.

::: tip A fájlodban ezeket a CSS változókat testreszabhatod

```css
* {
  --mvw-avatar-border-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-700));
}
```

:::

<!--@include: ../../packages/shared/dist/docs/component-variables.md -->
