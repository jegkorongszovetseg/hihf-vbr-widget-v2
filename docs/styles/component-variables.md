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

## Accordion

Fájl: `accordion.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-card-color: light-dark(var(--mvw-color-primary-950), var(--mvw-color-primary-200));
    --mvw-card-bg-color: light-dark(var(--mvw-color-white), var(--mvw-color-primary-950));
    --mvw-card-tonal-active-bg-color: light-dark(var(--mvw-color-primary-50), var(--mvw-color-primary-900));
  }
}
```

## Avatar

Fájl: `avatar.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-avatar-border-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-700));
  }
}
```

## Countdown

Fájl: `countdown.css`

```css
@layer components.variables {
  :where(:host) {
    /* Countdown */
    --mvw-countdown-title-height: calc(var(--size-16) * 2);
    --mvw-countdown-title-bg: light-dark(var(--mvw-color-primary-900), var(--mvw-color-primary-100));
    --mvw-countdown-gamedata-height: calc(var(--size-16) * 4);
    --mvw-countdown-active-color: light-dark(var(--mvw-color-secondary-500), var(--mvw-color-secondary-800));
    --mvw-countdown-gamedata-bg: light-dark(var(--mvw-color-primary-700), var(--mvw-color-primary-300));
    --mvw-countdown-result-bg: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-200));
  }
}
```

## Error Notice

Fájl: `error-notice.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-color-error-notice-bg-color: color-mix(in oklab, var(--mvw-color-error) 10%, transparent);
    --mvw-color-error-notice-border-color: color-mix(in oklab, var(--mvw-color-error) 25%, transparent);
    --mvw-color-error-notice-color: var(--mvw-color-error);
  }
}
```

## Floating Content

Fájl: `floating-content.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-tooltip-font-size: var(--font-size-200);
    --mvw-tooltip-color: light-dark(white, black);
    --mvw-tooltip-bg-color: light-dark(black, white);
    --mvw-floating-content-bg-color: light-dark(white, var(--mvw-color-primary-800));
  }
}
```

## Form Field

Fájl: `form-field.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-form-label-font-size: var(--font-size-200);
    --mvw-form-label-color: var(--mvw-text-muted);

    --mvw-input-color: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-200));
    --mvw-input-font-size: var(--font-size-400);
    --mvw-input-border-color: light-dark(var(--mvw-color-primary-300), var(--mvw-color-primary-700));
    --mvw-input-bg-color: light-dark(var(--mvw-color-white), var(--mvw-color-primary-950));
    --mvw-input-border-radius: var(--radius-2);
  }
}
```

## Game Center Game Data

Fájl: `game-center-game-data.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-gamecenter-result-size: calc(var(--size-16) * 6);
    --mvw-gamecenter-result-weight: 700;
    --mvw-gamecenter-result-color: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-200));
    --mvw-gamecenter-periodresults-color: var(--mvw-text-dimmed);
    --mvw-gamecenter-periodresults-size: var(--font-size-700);
    --mvw-gamecenter-teamname-size: var(--font-size-700);
    --mvw-gamecenter-teamname-color: light-dark(var(--mvw-color-primary-900), var(--mvw-color-primary-100));
    --mvw-gamecenter-teamname-weight: 700;
    --mvw-gamecenter-gamestatus-color: var(--mvw-text-muted);
    --mvw-gamecenter-gamestatus-size: var(--font-size-400);
  }
}
```

## Game Center Timeline

Fájl: `game-center-timeline.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-gamecenter-home-team-identifier-color: var(--mvw-color-info);
    --mvw-gamecenter-away-team-identifier-color: var(--mvw-color-team);

    --mvw-gamecenter-card-title-color: var(--mvw-text-highlighted);
    --mvw-gamecenter-card-secondary-color: var(--mvw-text-muted);
    --mvw-gamecenter-card-tertiary-color: var(--mvw-text-faded);
    --mvw-gamecenter-card-border-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-700));
    --mvw-gamecenter-card-bg-color: light-dark(var(--mvw-color-white), var(--mvw-color-primary-950));

    --mvw-gamecenter-team-container-title-color: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-200));

    --mvw-gamecenter-card-event-goal-border-color: light-dark(
      var(--mvw-color-primary-700),
      var(--mvw-color-primary-300)
    );
    --mvw-gamecenter-card-event-goal-bg-color: light-dark(var(--mvw-color-primary-700), var(--mvw-color-white));

    --mvw-gamecenter-events-evented-person-size: var(--font-size-500);
    --mvw-gamecenter-events-evented-person-weight: 600;
    --mvw-gamecenter-events-assitst-list-size: var(--font-size-400);
    --mvw-gamecenter-events-poi-list-size: var(--font-size-200);
    --mvw-gamecenter-events-score-size: var(--font-size-500);
    --mvw-gamecenter-events-penalty-size: var(--font-size-400);
    --mvw-gamecenter-events-goalie-direction-size: var(--font-size-400);
    --mvw-gamecenter-events-timeout-bg-color: var(--mvw-color-info);
  }
}
```

## Game Center

Fájl: `game-center.css`

```css
@layer components.variables {
  :where(:host) {
    /* --mvw-gamecenter-stats-bg-color: var(--mvw-color-primary-50); */
    /* --mvw-gamecenter-stats-border-color: var(--mvw-color-primary-100); */
    --mvw-gamecenter-stats-title-size: var(--font-size-300);
    /* --mvw-gamecenter-stats-title-color: var(--mvw-color-primary-400); */
    --mvw-gamecenter-stats-size: var(--font-size-500);
    /* --mvw-gamecenter-stats-color: var(--mvw-color-primary-800); */

    --mvw-gamecenter-period-header-bg-color: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-300));
    --mvw-gamecenter-period-header-color: light-dark(var(--mvw-color-white), var(--mvw-color-primary-900));
    --mvw-gamecenter-period-header-size: var(--font-size-300);
    --mvw-gamecenter-period-header-weight: 500;

    --mvw-gamecenter-team-container-title-color: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-200));
    --mvw-gamecenter-team-container-title-bg-color: light-dark(
      var(--mvw-color-primary-100),
      var(--mvw-color-primary-800)
    );
    --mvw-gamecenter-team-container-border-color: light-dark(
      var(--mvw-color-primary-100),
      var(--mvw-color-primary-800)
    );

    --mvw-gamecenter-events-evented-person-size: var(--font-size-500);
    --mvw-gamecenter-events-evented-person-weight: 600;
    --mvw-gamecenter-events-assitst-list-size: var(--font-size-400);
    --mvw-gamecenter-events-poi-list-size: var(--font-size-200);
    --mvw-gamecenter-events-score-size: var(--font-size-500);
    --mvw-gamecenter-events-penalty-size: var(--font-size-400);
    --mvw-gamecenter-events-goalie-direction-size: var(--font-size-400);
    /* --mvw-gamecenter-events-timeout-bg-color: #2870ed; */

    --mvw-gamecenter-card-title-color: var(--mvw-color-primary-900);
    --mvw-gamecenter-card-secondary-color: var(--mvw-color-primary-500);
    --mvw-gamecenter-card-tertiary-color: var(--mvw-color-primary-300);
    --mvw-gamecenter-card-border-color: var(--mvw-color-primary-100);
    --mvw-gamecenter-card-bg-color: var(--mvw-color-primary-0);

    --mvw-gamecenter-card-event-goal-border-color: var(--mvw-color-primary-700);
    --mvw-gamecenter-card-event-goal-bg-color: var(--mvw-color-primary-700);
  }
}
```

## Games Timeline

Fájl: `games-timeline.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-games-timeline-game-date-size: var(--font-size-100);
    --mvw-games-timeline-game-team-size: var(--font-size-300);
    --mvw-games-timeline-game-status-size: var(--font-size-200);
    --mvw-games-timeline-game-hover-bg-color: linear-gradient(
      light-dark(var(--mvw-color-white), var(--mvw-color-primary-950)),
      light-dark(
          hsl(from var(--mvw-color-white) h s calc(l - 5)),
          hsl(from var(--mvw-color-primary-950) h s calc(l + 5))
        )
        50%,
      light-dark(var(--mvw-color-white), var(--mvw-color-primary-950))
    );
  }
}
```

## List

Fájl: `list.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-list-item-font-size: var(--font-size-400);
    --mvw-list-item-color: light-dark(var(--mvw-color-primary-500), var(--mvw-color-primary-200));
    --mvw-list-item-hover-color: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-50));
    --mvw-list-item-hover-bg-color: light-dark(var(--mvw-color-primary-50), var(--mvw-color-primary-900));
    --mvw-list-item-selected-color: light-dark(var(--mvw-color-secondary-700), var(--mvw-color-secondary-300));
  }
}
```

## Paginator

Fájl: `paginator.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-paginator-color: light-dark(var(--mvw-color-primary-500), var(--mvw-color-primary-400));
    --mvw-paginator-bg-color: light-dark(var(--mvw-color-white), var(--mvw-color-primary-950));
    --mvw-paginator-hover-color: light-dark(var(--mvw-color-primary-700), var(--mvw-color-primary-300));
    --mvw-paginator-hover-bg-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-900));
    --mvw-paginator-border-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-700));
    --mvw-paginator-active-color: light-dark(var(--mvw-color-white), var(--mvw-color-black));
    --mvw-paginator-active-bg-color: light-dark(var(--mvw-color-primary-900), var(--mvw-color-primary-50));
    --mvw-paginator-disabled-color: light-dark(var(--mvw-color-primary-200), var(--mvw-color-primary-600));
  }
}
```

## Playoffs

Fájl: `playoffs.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-playoffs-header-bg: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-300));
    --mvw-playoffs-header-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-800));
    --mvw-playoffs-header-size: var(--font-size-500);
    --mvw-playoffs-details-bg: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-800));
  }
}
```

## Progress

Fájl: `progress.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-progress-height: 10px;
    --mvw-progress-border-radius: 5px;
    --mvw-progress-bg-color: light-dark(var(--mvw-color-primary-50), var(--mvw-color-primary-900));
    --mvw-progress-bar-color: var(--mvw-color-live);
    --mvw-progress-bar-stripe-color: rgba(from var(--mvw-color-white) r g b / 20%);
    --mvw-progress-bar-stripe-angle: 45deg;
  }
}
```

## Standings Selector

Fájl: `standings-selector.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-standings-selector-title-size: var(--font-size-500);
    --mvw-standings-selector-title-color: light-dark(var(--mvw-color-primary-700), var(--mvw-color-primary-300));
    --mvw-standings-selector-title-transform: none;
    --mvw-standings-selector-title-padding: 0 0.625em 0.5625em;
    --mvw-standings-selector-title-bg-color: transparent;

    --mvw-standings-selector-section-title-bg: light-dark(var(--mvw-color-primary-50), var(--mvw-color-primary-900));
    --mvw-standings-selector-section-title-size: var(--font-size-400);
    --mvw-standings-selector-section-title-color: light-dark(
      var(--mvw-color-primary-700),
      var(--mvw-color-primary-300)
    );
    --mvw-standings-selector-section-title-padding: var(--size-8);
    --mvw-standings-selector-section-logo-size: 30px;
  }
}
```

## Table

Fájl: `table.css`

```css
@layer components.variables {
  :where(:host) {
    /* Table */
    --mvw-table-header-font-size: var(--font-size-200);
    --mvw-table-default-column-width: 40px;
    --mvw-table-default-bg-color: light-dark(var(--mvw-color-white), var(--mvw-color-primary-900));
    --mvw-table-color: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-200));
    --mvw-table-neutral-color: light-dark(var(--mvw-color-primary-300), var(--mvw-color-primary-700));
    --mvw-table-header-bg-color: light-dark(var(--mvw-color-primary-800), var(--mvw-color-primary-200));
    --mvw-table-header-color: light-dark(var(--mvw-color-primary-200), var(--mvw-color-primary-800));
    --mvw-table-header-hover-bg-color: light-dark(var(--mvw-color-primary-700), var(--mvw-color-primary-300));
    --mvw-table-header-active-bg-color: light-dark(var(--mvw-color-primary-700), var(--mvw-color-primary-300));
    --mvw-table-header-active-color: light-dark(var(--mvw-color-white), var(--mvw-color-primary-900));
    --mvw-table-hover-color: light-dark(var(--mvw-color-primary-900), var(--mvw-color-white));
    --mvw-table-hover-bg-color: light-dark(var(--mvw-color-secondary-100), var(--mvw-color-primary-950));
    --mvw-table-active-color: light-dark(var(--mvw-color-secondary-900), var(--mvw-color-secondary-100));
    --mvw-table-active-bg-color: light-dark(var(--mvw-color-secondary-200), var(--mvw-color-secondary-800));
    --mvw-table-active-even-bg-color: light-dark(var(--mvw-color-secondary-300), var(--mvw-color-secondary-700));
    --mvw-table-active-hover-color: light-dark(var(--mvw-color-secondary-900), var(--mvw-color-secondary-100));
    --mvw-table-active-hover-bg-color: light-dark(var(--mvw-color-secondary-400), var(--mvw-color-secondary-500));
    --mvw-table-portrait-border-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-900));
    --mvw-table-portrait-bg-color: light-dark(var(--mvw-color-primary-50), var(--mvw-color-primary-900));
    --mvw-table-stripped-bg-color: light-dark(
      hsl(from var(--mvw-color-primary-50) h s calc(l + 3)),
      hsl(from var(--mvw-color-primary-900) h s calc(l + 2))
    );
    --mvw-table-label-color: light-dark(var(--mvw-color-primary-500), var(--mvw-color-primary-400));
    --mvw-table-label-bg-color: light-dark(var(--mvw-color-primary-50), var(--mvw-color-primary-900));
    --mvw-table-cell-logo-size: 20px;
    --mvw-table-cell-portrait-size: 26px;
    --mvw-table-caption-color: light-dark(var(--mvw-color-primary-400), var(--mvw-color-primary-600));
    --mvw-table-caption-font-size: var(--font-size-200);
  }
}
```

## Tabs

Fájl: `tabs.css`

```css
@layer components.variables {
  :where(:host) {
    /* Tabs */
    --mvw-tab-btn-font-size: var(--font-size-500);
    --mvw-tab-btn-font-weight: 500;
    --mvw-tab-btn-color: light-dark(var(--mvw-color-primary-300), var(--mvw-color-primary-500));
    --mvw-tab-btn-border-style: solid;
    --mvw-tab-btn-border-width: 0 0 3px 0;
    --mvw-tab-btn-text-transform: uppercase;
    --mvw-tab-btn-hover-color: light-dark(var(--mvw-color-primary-500), var(--mvw-color-primary-300));
    --mvw-tab-btn-hover-border-color: transparent;
    --mvw-tab-btn-active-color: light-dark(var(--mvw-color-primary-900), var(--mvw-color-primary-50));
    --mvw-tab-btn-active-border-color: var(--mvw-border-highlighted);
    --mvw-tab-btn-group-separator-color: var(--mvw-border-muted);

    /* Toggle */
    --mvw-toggle-group-gap: var(--size-6);
    --mvw-toggle-group-nav-padding: 0;
    --mvw-toggle-group-border-width: 0;
    --mvw-toggle-group-btn-padding: var(--size-4) var(--size-8);
    --mvw-toggle-group-btn-size: var(--font-size-400);
    --mvw-toggle-group-btn-color: light-dark(var(--mvw-color-primary-900), var(--mvw-color-primary-100));
    --mvw-toggle-group-btn-bg-color: light-dark(var(--mvw-color-primary-50), var(--mvw-color-primary-900));
    --mvw-toggle-group-btn-active-color: var(--mvw-color-primary-0);
    --mvw-toggle-group-btn-active-bg-color: var(--mvw-bg-highlighted);
    --mvw-toggle-group-btn-radius: var(--radius-2);
  }
}
```

## Timezone Selector

Fájl: `timezone-selector.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-timezone-selector-color: light-dark(var(--mvw-color-primary-500), var(--mvw-color-primary-500));
    --mvw-timezone-selector-font-size: var(--font-size-300);
  }
}
```

## Top List

Fájl: `top-list.css`

```css
@layer components.variables {
  :where(:host) {
    --mvw-top-list-bg-color: var(--mvw-color-primary-900);
    --mvw-top-list-title-color: var(--mvw-color-primary-50);
    --mvw-top-list-title-separator-color: var(--mvw-color-primary-700);
    --mvw-top-list-value-color: var(--mvw-color-primary-300);
    --mvw-top-list-player-separator-color: var(--mvw-color-primary-800);
    --mvw-top-list-image-border-color: var(--mvw-color-primary-600);
    --mvw-top-list-image-bg-color: var(--mvw-color-primary-800);
    --mvw-top-list-selector-border-color: var(--mvw-color-primary-400);
  }
}
```
