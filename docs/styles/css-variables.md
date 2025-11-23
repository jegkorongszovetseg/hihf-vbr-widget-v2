# Szöveg

A widgetek használják a CSS változokat, sok esetben a CSS utility class segítségével:

::: info Szöveg

<div style="display: flex; gap: 1rem; padding: 1rem; justify-content: center;">
  <div class="text-faded">Text Faded</div>
  <div class="text-dimmed">Text Dimmed</div>
  <div class="text-muted">Text Muted</div>
  <div class="text-default">Text Default</div>
  <div class="text-highlighted">Text Highlighted</div>
</div>
:::

Minden utility class és komponens CSS változót használ a világos és sötét módok színének beállításához:

```css
:host {
  --mvw-text-pale: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-700));
  --mvw-text-faded: light-dark(var(--mvw-color-primary-200), var(--mvw-color-primary-600));
  --mvw-text-dimmed: light-dark(var(--mvw-color-primary-400), var(--mvw-color-primary-500));
  --mvw-text-muted: light-dark(var(--mvw-color-primary-500), var(--mvw-color-primary-400));
  --mvw-text-toned: light-dark(var(--mvw-color-primary-600), var(--mvw-color-primary-300));
  --mvw-text-default: light-dark(var(--mvw-color-primary-700), var(--mvw-color-primary-200));
  --mvw-text-highlighted: light-dark(var(--mvw-color-primary-900), var(--mvw-color-primary-50));
  --mvw-text-inverted: light-dark(var(--mvw-color-white), var(--mvw-color-primary-950));
}
```

::: tip A fájlodban ezeket a CSS változókat testreszabhatod

```css
* {
  --mvw-text-highlighted: light-dark(var(--mvw-color-black), var(--mvw-color-white));
}
```

:::

# Háttér

::: info Hátter

<div style="display: flex; gap: 1rem; padding: 1rem; justify-content: center;">
  <div style="background: var(--mvw-bg-default); padding: 0.5rem 1rem;">Default</div>
  <div style="background: var(--mvw-bg-muted); padding: 0.5rem 1rem;">Muted</div>
  <div style="background: var(--mvw-bg-elevated); padding: 0.5rem 1rem;">Elevated</div>
  <div style="background: var(--mvw-bg-accented); padding: 0.5rem 1rem;">Accented</div>
  <div style="background: var(--mvw-bg-highlighted); padding: 0.5rem 1rem;">Highlighted</div>
  <div style="background: var(--mvw-bg-inverted); padding: 0.5rem 1rem; color: var(--mvw-text-inverted);">Inverted</div>
</div>
:::

A háttérszínek esetén is használhatod a világos és sötét módok színének beállításához:

```css
:host {
  --mvw-bg-default: light-dark(var(--mvw-color-white), var(--mvw-color-primary-950));
  --mvw-bg-muted: light-dark(var(--mvw-color-primary-50), var(--mvw-color-primary-900));
  --mvw-bg-elevated: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-800));
  --mvw-bg-accented: light-dark(var(--mvw-color-primary-200), var(--mvw-color-primary-700));
  --mvw-bg-highlighted: var(--mvw-color-secondary-500);
  --mvw-bg-inverted: light-dark(var(--mvw-color-primary-900), var(--mvw-color-primary-50));
}
```

::: tip A fájlodban ezeket a CSS változókat testreszabhatod

```css
* {
  --mvw-bg-highlighted: light-dark(var(--mvw-color-black), var(--mvw-color-white));
}
```

:::

# Keret

A keret színek esetén is használhatod a világos és sötét módok beállításához:

```css
:host {
  --mvw-border-faded: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-800));
  --mvw-border-muted: light-dark(var(--mvw-color-primary-200), var(--mvw-color-primary-700));
  --mvw-border-highlighted: var(--mvw-color-secondary-500);
}
```

::: tip A fájlodban ezeket a CSS változókat testreszabhatod

```css
* {
  --mvw-border-highlighted: light-dark(var(--mvw-color-black), var(--mvw-color-white));
}
```

:::

# Link

A link színt is testreszabhatod:

```css
:host {
  --mvw-link-color: light-dark(var(--mvw-color-secondary-700), var(--mvw-color-secondary-400));
  --mvw-link-hover-color: light-dark(var(--mvw-color-secondary-900), var(--mvw-color-secondary-200));
}
```

::: tip A fájlodban ezeket a CSS változókat testreszabhatod

```css
* {
  --mvw-link-color: light-dark(var(--mvw-color-white), var(--mvw-color-black));
  --mvw-link-hover-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-800));
}
```

:::
