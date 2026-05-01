# Optimalizálási Javaslatok - @mjsz-vbr-elements Monorepo

## Projekt áttekintés

- **Monorepo**: pnpm workspaces, 6+1 csomag (core, elements, extended, gamecenter, liga, internal, shared)
- **Build**: Vite 8, ESM + IIFE, gzip/brotli tömörítés
- **Framework**: Vue 3.5 + Custom Elements (Web Components)
- **Dist méretek**: Core: 496KB, Gamecenter: 432KB, Liga: 424KB, Extended: 392KB, Elements: 160KB, Internal: 136KB, Shared: 48KB

---

## 1. Csomagméret Csökkentési Lehetőségek

### 1.1 Ramda eltávolítása / kiváltása (~45KB gzipped megtakarítás)

**Probléma**: A `ramda` library teljes mérete ~45KB gzipped. A `convert.js` 44 Ramda függvényt importál, és 8 további fájl is használja.

**Javaslat**:

- A legtöbb Ramda függvénynek van natív JS megfelelője (ES2023+):
  - `isEmpty` → `Object.keys(obj).length === 0` vagy `arr.length === 0`
  - `filter`, `map`, `sort` → natív Array metódusok
  - `pipe`, `compose` → egyszerű függvény kompozíció
  - `prop`, `path` → optional chaining (`?.`)
  - `toLower`, `toUpper` → `String.prototype` metódusok
  - `includes` → `Array/String.prototype.includes()`
- Alternatíva: `ramda` → `remeda` (~8KB gzipped, tree-shakeable, TypeScript-first)

**Érintett fájlok**:

- `packages/core/src/utils/convert.js` (44 import, 509 sor)
- `packages/core/src/composables/useFetchVBRApi.js` (isEmpty)
- `packages/core/src/composables/useI18n.js`
- `packages/core/src/composables/useColumns.js`
- `packages/core/src/composables/usePage.js`
- `packages/core/src/composables/useScrollToGameDate.js`
- `packages/core/src/composables/useAdditionalText.js`
- `packages/core/src/utils/string.js`
- `packages/core/src/components/I18NProvider.vue`

### 1.2 @vueuse/core szelektív importok

**Probléma**: A `@vueuse/core` egy hatalmas utility library. Bár tree-shakeable, a IIFE build-ek nem tudják kiszűrni a nem használt kódot.

**Javaslat**:

- Az ESM build-eknél nincs probléma (tree-shaking működik)
- IIFE build-eknél: vizsgáld meg a `@vueuse/core`-ból ténylegesen használt composable-öket és manuálisan másold be a szükségeseket, vagy használd a sub-package importot: `@vueuse/core/useAsyncState`
- Használt vueuse composable-ök: `useAsyncState`, `useTimeoutPoll`, `useWebSocket`, `useUrlSearchParams`, `useImage`

### 1.3 dayjs optimalizálás

**Probléma**: A `dayjs` alapból kicsi (~2KB), de a plugin-ek és locale-ok növelik.

**Javaslat**:

- Ellenőrizd, hogy csak a szükséges plugin-ek vannak betöltve
- Amennyiben csak formázás kell: az `Intl.DateTimeFormat` natív API használatát fontold meg (0KB extra)
- `datetime.js` (138 sor) review-ja szükséges

### 1.4 @floating-ui/dom alternatívák

**Probléma**: ~12KB gzipped, és valószínűleg csak egy helyen használt (FloatingPanel.vue).

**Javaslat**:

- Ha csak egyszerű tooltip kell: CSS-only megoldás (`popover` API, vagy `anchor positioning`)
- Ha maradna: `@floating-ui/dom` → `@floating-ui/vue` a Vue integráció miatt jobb

### 1.5 Barrel export optimalizáció

**Probléma**: `core/src/index.js` mindent re-exportál (`export * from './columns'`, `export * from './components'`, stb.). Ez a IIFE build-eknél a teljes csomagot behúzza.

**Javaslat**:

- Ne legyen "mindent összegyűjtő" barrel az IIFE build entry point-jaként
- Az IIFE build-eket komponensenként vagy logikai csoportonként külön entry point-okkal építsd
- A jelenlegi multi-entry (`components.js`, `composables.js`, `utils.js`) jó irányba mutat — de az `index.js` mindent tartalmaz

### 1.6 SVG ikonok inline-olása helyett sprite használata

**Probléma**: 21 SVG ikon egyenként Vue component-ként van betöltve (`vite-svg-loader`). Minden ikon egy külön JS modul.

**Javaslat**:

- SVG sprite sheet használata (1 HTTP request, CSS-sel megcímezhető)
- Vagy: compile-time inline SVG strings (nem reactive Vue component, hanem raw SVG)

---

## 2. Gyenge Keresztmetszetek (Bottleneck-ek)

### 2.1 `convert.js` — Hot Path-on lévő heavy computation

**Probléma**: A `convert()` chainable API minden `computed()` újraértékeléskor lefut:

```javascript
const convertedRows = computed(() => {
  return convert(unref(rows))
    .filter(props.teamFilterByName, ['homeTeamName', 'awayTeamName'])
    .schedule(unref(timezone), unref(locale))
    .pagination(unref(page), props.limit)
    .value();
});
```

- Spreadelés (`[...data]`) minden híváskor új tömb
- `.map()` hívások minden láncszem-ben új tömböt hoznak létre
- Ramda `pipe()`/`compose()` overhead a filter predikátumokban
- A filter, sort, transform, pagination **egyszerre** fut le, nem lépcsőzetesen cache-elve

**Javaslat**:

- Válaszd szét a computed pipeline-t kisebb lépésekre:
  ```javascript
  const filteredRows = computed(() => convert(rows).filter(...).value())
  const sortedRows = computed(() => sorted(filteredRows, ...))
  const paginatedRows = computed(() => paginate(sortedRows, page, limit))
  ```
- Így a pagination nem triggerel újra filter+sort-ot
- Használj `shallowRef` / `shallowReactive`-ot ahol a deep reactivity nem szükséges

### 2.2 DataProvider pattern — Reactive state overhead

**Probléma**: A `liga` és `extended` csomagokban a DataProvider.vue (250-310 sor) nagy `reactive()` objektumokat hoz létre, amelyek deep proxy-k.

**Javaslat**:

- `reactive()` → `shallowReactive()` ahol nem kell mélységi figyelés
- A nagy adattömbök (`rows`) `shallowRef()`-ben legyenek
- Vegye fontolóra a `markRaw()` használatát az API response-ok immutable részein

### 2.3 WebSocket frissítések — Felesleges újrarenderelések

**Probléma**: A gamecenter WebSocket üzenetek reactive state-be íródnak, ami az egész component tree-t újrarenderelheti.

**Javaslat**:

- Throttle/debounce alkalmazása a WebSocket message handler-ekben (a `use-attendance-socket.js`-ben már van 5s throttle — jó minta)
- `shallowRef` a WebSocket data-hoz
- Fontold meg a `v-memo` direktíva használatát a listaelemeknél

### 2.4 Nincs virtualizáció nagy listáknál

**Probléma**: 68 `v-for` loop a kódbázisban, és bár van pagination (limit=20), egyes felhasználási módoknál (pl. teljes szezon mérkőzésnaptára) nagy adatmennyiség jelenhet meg.

**Javaslat**:

- `@tanstack/vue-virtual` integrálás opcionális prop-pal
- Vagy: intersection observer-alapú "infinite scroll" a pagination helyett/mellett

### 2.5 columns.js mérete (~28KB)

**Probléma**: A `columns.js` az összes oszlopdefiníciót tartalmazza minden statisztika típushoz. Ez mindig betöltődik, még ha csak egy típus kell.

**Javaslat**:

- Oszlopdefiníciók lazy loading-ja / code splitting-je statisztika típusonként
- Vagy: JSON-ként tárold és build-időben generáld

---

## 3. Performancia Növelési Javaslatok

### 3.1 Computed pipeline szétválasztás (lásd 2.1)

A legfontosabb egyetlen optimalizáció. A filter/sort/format/paginate szétválasztásával a pagination változás nem futtatja újra a teljes pipeline-t.

### 3.2 Shallow reactivity adattömböknél

```js
// Jelenlegi
const rows = ref([]);  // deep proxy a teljes tömbön

// Javasolt
const rows = shallowRef([]);  // csak a referencia változás triggerel update-ot
```

Ez különösen fontos a DataProvider-ekben ahol API response (akár 100+ elem) kerül state-be.

### 3.3 API response caching

**Probléma**: Nincs kliens-oldali cache az API hívásokhoz. Minden navigáció / prop változás új fetch-et indít.

**Javaslat**:

- Egyszerű in-memory cache (Map) az `useFetchVBRApi.js`-ben route+params alapján
- TTL: 60s (vagy konfigurálható)
- Stale-while-revalidate minta
- Alternatíva: `@tanstack/vue-query` integrálás (beépített cache, retry, stale-while-revalidate)

### 3.4 Image lazy loading javítása

**Probléma**: Az `Image.vue` `loading="lazy"` attribútumot használ, de a Web Component-ek Shadow DOM-jában ez nem mindig működik megbízhatóan.

**Javaslat**:

- IntersectionObserver-alapú lazy loading implementálása
- Placeholder/skeleton megjelenítése betöltés közben
- `decoding="async"` attribútum hozzáadása

### 3.5 CSS optimalizáció

**Javaslat**:

- A shared CSS fájlok (`theme.css`, `normalize.css`) összemerge-lése a build folyamatban
- Critical CSS inline-olása a Custom Element-ek Shadow DOM-jába
- `content-visibility: auto` használata a nem látható szekciókhoz

### 3.6 useFetchVBRApi.js — Promise anti-pattern

**Probléma**: A `fetchVBRData` function explicit `new Promise()` wrapper-t használ fetch körül, ami felesleges és elnyeli a stack trace-eket.

**Javaslat**:

```javascript
export async function fetchVBRData(route, apiKey, data) {
  const url = `${VBR_API_BASE_URL}/vbr${unref(route)}${data ? `?${objectToQueryString(data)}` : ''}`;
  const response = await fetch(url, { ... });
  const json = await response.json();
  if (json.error) throw json;
  if (json.data.message) throw json.data;
  return json.data;
}
```

---

## 4. Vue SSR (Nuxt) Kompatibilitási Problémák

### 4.1 KRITIKUS: `window.__MJSZ_VBR_WIDGET__` globális state

**Probléma** (`core/src/index.js`, sor 10):

```javascript
window.__MJSZ_VBR_WIDGET__ = { apiKey, gameResolver, teamResolver, playerResolver };
```

- SSR-ben nincs `window` objektum → `ReferenceError: window is not defined`
- `resolveApiKey()` szintén `window`-hoz nyúl

**Megoldás**:

- `globalThis` használata `window` helyett (Node.js-ben is elérhető)
- Vagy: provide/inject pattern-re migráció a globális state helyett
- Nuxt plugin-ként: `if (import.meta.client)` guard

### 4.2 KRITIKUS: Custom Elements regisztráció

**Probléma**: `customElements.define()` csak böngészőben érhető el.

**Megoldás**:

- A `register()` hívás `if (typeof customElements !== 'undefined')` guard mögé
- Nuxt-ban: `<ClientOnly>` wrapper vagy `client-only` plugin
- Alternatíva: SSR-kompatibilis wrapper komponensek exportálása a CE-k mellett

### 4.3 Browser API-k guard nélkül

| Fájl                                 | API                         | Probléma               |
| ------------------------------------ | --------------------------- | ---------------------- |
| `utils/cookie.js`                    | `document.cookie`           | ReferenceError SSR-ben |
| `utils/dom.js`                       | `document.querySelector()`  | ReferenceError SSR-ben |
| `utils/scroll.js`                    | `window.scrollTo()`         | ReferenceError SSR-ben |
| `composables/useScrollToGameDate.js` | `querySelector`, `scrollTo` | ReferenceError SSR-ben |
| `composables/useGameDataSocket.js`   | WebSocket                   | Nem elérhető SSR-ben   |

**Megoldás**:

- `import.meta.client` / `import.meta.server` guard-ok (Nuxt-ban natív)
- `@vueuse/core` `useMediaQuery`-szerű SSR-safe pattern alkalmazása
- `onMounted()` lifecycle hook-ba helyezés (csak client-side fut)

### 4.4 WebSocket kezelés SSR-ben

**Probléma**: A `useGameDataSocket` és `useAttendanceSocket` composable-ök WebSocket kapcsolatot nyitnak. SSR-ben ez nem lehetséges.

**Megoldás**:

- A WebSocket logikát `onMounted()`-ba wrappelni
- Server-side: skip WebSocket, returnoljon üres/default state-et
- `@vueuse/core` `useWebSocket` már SSR-safe (noop server-side) — ellenőrizd, hogy a saját implementáció is az-e

### 4.5 Hydration mismatch kockázatok

**Probléma**: Ha a szerver és kliens különböző adatokat renderel (pl. timezone-függő dátumformázás, locale-alapú szövegek), hydration error keletkezik.

**Megoldás**:

- Timezone/locale-függő renderelés `<ClientOnly>` vagy `onMounted`-ban
- Vagy: a szerver is kapja meg a megfelelő timezone/locale konfigurációt
- `useId()` (Vue 3.5+) használata egyedi ID-k generálásához SSR-ben

### 4.6 Nincs dynamic import — code splitting hiánya

**Probléma**: Az összes komponens statikusan van importálva. Nuxt-ban ez azt jelenti, hogy az egész bundle letöltődik az első oldalbetöltéskor.

**Megoldás**:

- `defineAsyncComponent()` használata a ritkábban használt komponenseknél
- Nuxt auto-imports és lazy loading kihasználása
- Route-alapú code splitting természetes Nuxt-ban, de a widget library-nak is támogatnia kell

### 4.7 SSR-kompatibilis Nuxt modul/plugin javaslat

```typescript
// nuxt-plugin koncepció
export default defineNuxtPlugin({
  name: 'mjsz-vbr-widget',
  setup(nuxtApp) {
    // Server + Client: provide config via Vue injection
    nuxtApp.vueApp.provide('mjsz-vbr-config', {
      apiKey: useRuntimeConfig().public.mjszApiKey,
      // ...
    });

    // Client only: register custom elements
    if (import.meta.client) {
      register();
    }
  }
});
```

---

## Prioritási Sorrend (hatás / effort arány alapján)

| #   | Javaslat                                  | Hatás      | Effort   | Típus        |
| --- | ----------------------------------------- | ---------- | -------- | ------------ |
| 1   | Ramda eltávolítása natív JS-re            | ⭐⭐⭐⭐⭐ | Közepes  | Bundle méret |
| 2   | Computed pipeline szétválasztás           | ⭐⭐⭐⭐⭐ | Alacsony | Performancia |
| 3   | SSR guard-ok hozzáadása (window/document) | ⭐⭐⭐⭐⭐ | Alacsony | SSR compat   |
| 4   | shallowRef/shallowReactive bevezetése     | ⭐⭐⭐⭐   | Alacsony | Performancia |
| 5   | API response cache                        | ⭐⭐⭐⭐   | Közepes  | Performancia |
| 6   | CustomElements regisztráció SSR guard     | ⭐⭐⭐⭐   | Alacsony | SSR compat   |
| 7   | IIFE entry point szétbontás               | ⭐⭐⭐     | Közepes  | Bundle méret |
| 8   | dayjs → Intl.DateTimeFormat               | ⭐⭐⭐     | Közepes  | Bundle méret |
| 9   | columns.js lazy loading                   | ⭐⭐⭐     | Alacsony | Bundle méret |
| 10  | Nuxt modul/plugin létrehozása             | ⭐⭐⭐     | Magas    | SSR compat   |
| 11  | @vueuse/core cherry-pick IIFE-hez         | ⭐⭐       | Közepes  | Bundle méret |
| 12  | Virtual scrolling                         | ⭐⭐       | Magas    | Performancia |
| 13  | SVG sprite                                | ⭐⭐       | Alacsony | Bundle méret |
| 14  | fetchVBRData promise refactor             | ⭐         | Alacsony | Kód minőség  |

---

## Összefoglalás

A legjelentősebb megtakarítások:

- **Bundle méret**: Ramda eltávolítása (~45KB gzip) + dayjs → Intl API (~6KB) + barrel export optimalizálás
- **Runtime performancia**: Computed pipeline szétválasztás + shallow reactivity + API cache
- **SSR kompatibilitás**: Guard-ok hozzáadása a browser API-khoz + provide/inject a window global helyett + CE regisztráció client-only
