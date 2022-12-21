# CSS változók

```css
:host {
  font-family: 'Roboto Condensed', Avenir, Helvetica, Arial, sans-serif;

  --vbr-widget-primary-color-0: #ffffff;
  --vbr-widget-primary-color-50: #eceff1;
  --vbr-widget-primary-color-100: #cfd8dc;
  --vbr-widget-primary-color-200: #b0bec5;
  --vbr-widget-primary-color-300: #90a4ae;
  --vbr-widget-primary-color-400: #78909c;
  --vbr-widget-primary-color-500: #607d8b;
  --vbr-widget-primary-color-600: #546e7a;
  --vbr-widget-primary-color-700: #455a64;
  --vbr-widget-primary-color-800: #37474f;
  --vbr-widget-primary-color-900: #263238;

  --vbr-widget-secondary-color-100: #dcedc8;
  --vbr-widget-secondary-color-200: #badb94;
  --vbr-widget-secondary-color-300: #aed581;
  --vbr-widget-secondary-color-400: #9ccc65;
  --vbr-widget-secondary-color-500: #8bc34a;
  --vbr-widget-secondary-color-700: #689f38;
  --vbr-widget-secondary-color-800: #558b2f;
  --vbr-widget-secondary-color-900: #33691e;

  --vbr-widget-danger-color-50: #ffebee;
  --vbr-widget-danger-color-100: #ffcdd2;
  --vbr-widget-danger-color-200: #ef9a9a;
  --vbr-widget-danger-color-300: #e57373;
  --vbr-widget-danger-color-400: #ef5350;
  --vbr-widget-danger-color-500: #f44336;
  --vbr-widget-danger-color-700: #d32f2f;
  --vbr-widget-danger-color-900: #b71c1c;
  --vbr-widget-danger-color-a400: #ff1744;

  --vbr-widget-live-game-color: #8bc34a;

  --vbr-widget-table-header-font-size: 12px;
  --vbr-widget-table-default-column-width: 30px;
  --vbr-widget-table-default-bg-color: var(--vbr-widget-primary-color-0);
  --vbr-widget-table-color: var(--vbr-widget-primary-color-800);
  --vbr-widget-table-neutral-color: var(--vbr-widget-primary-color-300);
  --vbr-widget-table-header-bg-color: var(--vbr-widget-primary-color-800);
  --vbr-widget-table-header-hover-bg-color: var(--vbr-widget-primary-color-700);
  --vbr-widget-table-header-color: var(--vbr-widget-primary-color-200);
  --vbr-widget-table-table-header-active-bg-color: var(--vbr-widget-primary-color-700);
  --vbr-widget-table-header-active-color: var(--vbr-widget-primary-color-0);
  --vbr-widget-table-hover-color: var(--vbr-widget-secondary-color-900);
  --vbr-widget-table-hover-bg-color: var(--vbr-widget-secondary-color-100);
  --vbr-widget-table-active-color: var(--vbr-widget-secondary-color-900);
  --vbr-widget-table-active-bg-color: var(--vbr-widget-secondary-color-200);
  --vbr-widget-table-active-even-bg-color: var(--vbr-widget-secondary-color-300);
  --vbr-widget-table-active-hover-color: var(--vbr-widget-secondary-color-900);
  --vbr-widget-table-active-hover-bg-color: var(--vbr-widget-secondary-color-400);
  --vbr-widget-table-portrait-border-color: var(--vbr-widget-primary-color-100);
  --vbr-widget-table-portrait-bg-color: var(--vbr-widget-primary-color-50);
  --vbr-widget-table-cell-light-color: var(--vbr-widget-primary-color-600);
  --vbr-widget-table-cell-dark-color: var(--vbr-widget-primary-color-900);
  --vbr-widget-table-stripped-bg-color: #f8f9fa;
  --vbr-widget-table-label-color: var(--vbr-widget-primary-color-500);
  --vbr-widget-table-label-bg-color: var(--vbr-widget-primary-color-50);
  --vbr-widget-table-cell-logo-size: 20px;
  --vbr-widget-table-cell-portrait-size: 26px;

  --vbr-widget-paginator-color: var(--vbr-widget-primary-color-500);
  --vbr-widget-paginator-bg-color: var(--vbr-widget-primary-color-0);
  --vbr-widget-paginator-hover-color: var(--vbr-widget-primary-color-700);
  --vbr-widget-paginator-hover-bg-color: var(--vbr-widget-primary-color-100);
  --vbr-widget-paginator-border-color: var(--vbr-widget-primary-color-100);
  --vbr-widget-paginator-active-color: var(--vbr-widget-primary-color-0);
  --vbr-widget-paginator-active-bg-color: var(--vbr-widget-primary-color-900);
  --vbr-widget-paginator-disabled-color: var(--vbr-widget-primary-color-200);

  --vbr-widget-tooltip-font-size: 12px;
  --vbr-widget-tooltip-color: #ffffff;
  --vbr-widget-tooltip-bg-color: #000000;

  --vbr-widget-popover-trigger-hover-bg-color: var(--vbr-widget-secondary-color-200);
  --vbr-widget-popover-trigger-focus-bg-color: var(--vbr-widget-secondary-color-300);
  --vbr-widget-popover-bg-color: var(--vbr-widget-primary-color-0);

  --vbr-widget-dropdown-item-color: var(--vbr-widget-primary-color-500);
  --vbr-widget-dropdown-item-hover-color: var(--vbr-widget-primary-color-800);
  --vbr-widget-dropdown-item-hover-bg-color: var(--vbr-widget-primary-color-50);

  --vbr-widget-error-notice-bg-color: var(--vbr-widget-danger-color-50);
  --vbr-widget-error-notice-border-color: var(--vbr-widget-danger-color-100);
  --vbr-widget-error-notice-color: var(--vbr-widget-danger-color-700);

  --vbr-widget-link-color: var(--vbr-widget-secondary-color-700);
  --vbr-widget-hover-color: var(--vbr-widget-secondary-color-900);

  --vbr-widget-base-input-color: var(--vbr-widget-primary-color-800);
  --vbr-widget-base-input-font-size: 0.875rem;
  --vbr-widget-base-input-border-color: var(--vbr-widget-primary-color-300);
  --vbr-widget-base-input-border-radius: 3px;

  --vbr-widget-form-label-color: var(--vbr-widget-primary-color-500);
  --vbr-widget-form-label-font-size: 0.75rem;

  --vbr-widget-timezone-selector-color: var(--vbr-widget-primary-color-500);
  --vbr-widget-timezone-selector-font-size: 0.8125rem;

  --vbr-widget-badge-bg-color: var(--vbr-widget-primary-color-50);
  --vbr-widget-badge-color: var(--vbr-widget-primary-color-400);
  --vbr-widget-badge-font-size: 0.625rem;

  --vbr-widget-tab-btn-padding: 0.625rem 1rem;
  --vbr-widget-tab-btn-font-size: 1rem;
  --vbr-widget-tab-btn-font-weight: 500;
  --vbr-widget-tab-btn-bg-color: var(--vbr-widget-primary-color-0);
  --vbr-widget-tab-btn-color: var(--vbr-widget-primary-color-300);
  --vbr-widget-tab-btn-border-color: transparent;
  --vbr-widget-tab-btn-border-style: solid;
  --vbr-widget-tab-btn-border-width: 0 0 3px 0;
  --vbr-widget-tab-btn-text-transform: uppercase;
  --vbr-widget-tab-btn-hover-color: var(--vbr-widget-primary-color-500);
  --vbr-widget-tab-btn-hover-bg-color: var(--vbr-widget-primary-color-0);
  --vbr-widget-tab-btn-hover-border-color: transparent;
  --vbr-widget-tab-btn-active-bg-color: var(--vbr-widget-primary-color-0);
  --vbr-widget-tab-btn-active-color: var(--vbr-widget-primary-color-900);
  --vbr-widget-tab-btn-active-border-color: var(--vbr-widget-secondary-color-500);
}
```
