# Visual Design System: Mantra Music Player

## 1. Visual Theme & Atmosphere

Mantra uses a dense desktop control-surface aesthetic rather than a consumer streaming aesthetic. The interface reads as a library operations workspace: calm, deliberate, muted, and practical. Visual hierarchy comes from thin dividers, layered surfaces, compact typography, and carefully limited use of accent color instead of heavy shadows or decorative effects.

The mood is editorial and infrastructural at the same time. Light theme feels like a paper-tinted workstation with soft mineral neutrals. Dark theme keeps the same geometry and restraint, but shifts the atmosphere toward a low-glare studio console. In both themes, the interface prioritizes scanability, maintenance workflows, and data-rich review over immersion or spectacle.

## 2. Color Palette & Roles

### Core Surfaces

- `--bg`
  - Light: `#f4f4f1`
  - Dark: `#121311`
  - Role: application canvas and outer shell background.
- `--panel`
  - Light: `#fbfbf8`
  - Dark: `#191a17`
  - Role: primary surface for sidebars, panels, headers, and persistent containers.
- `--panel-muted`
  - Light: `#eeeeea`
  - Dark: `#22231f`
  - Role: secondary surface for controls, selected rows, compact cards, meters, and low-elevation emphasis.

### Borders And Structure

- `--line`
  - Light: `#d7d7d0`
  - Dark: `#30322c`
  - Role: default borders, separators, input outlines, and control framing.
- `--line-strong`
  - Light: `#b9bab2`
  - Dark: `#474a42`
  - Role: declared as a stronger structural line token, but currently unused in the inspected files.

### Content

- `--text`
  - Light: `#1c1d1b`
  - Dark: `#eeeee7`
  - Role: primary text, strongest labels, and filled-action foreground.
- `--text-muted`
  - Light: `#676b65`
  - Dark: `#a4a89e`
  - Role: secondary text, inactive navigation, metadata, and utility labels.
- `--text-faint`
  - Light: `#8b8f87`
  - Dark: `#74786f`
  - Role: helper text, counters, timestamps, and low-priority supporting detail.
- `--inverse`
  - Light: `#f7f7f2`
  - Dark: `#10110f`
  - Role: text and icon color placed on dark filled controls.

### Functional Accents

- `neutral`
  - Source mapping: `--text-muted`
  - Role: a non-highlight accent variant used for subdued icons, covers, and status markers.
- `--accent-mint`
  - Light: `#1f8a70`
  - Dark: `#69bfa9`
  - Role: brand accent, meter fill, waveform, and one of the reusable accent markers applied to sources, covers, and status pills.
- `--accent-blue`
  - Light: `#3e6a91`
  - Dark: `#78a3c8`
  - Role: focus indication and one of the reusable accent markers applied to sources, controls, and status-related UI.
- `--accent-amber`
  - Light: `#a36b19`
  - Dark: `#d39a44`
  - Role: one of the reusable accent markers, used in cautionary contexts but also used categorically in navigation and content markers.
- `--accent-danger`
  - Light: `#a6463f`
  - Dark: `#d16f67`
  - Role: destructive or broken-state signaling where a dedicated danger treatment is needed.

### Observed Token Usage

- `--bg` is used as the outer application background.
- `--panel` is used as the default panel and card surface.
- `--panel-muted` is used for selected rows, compact utility blocks, control groups, and low-contrast emphasis.
- `--line` is the standard border and separator color across the shell.
- `--text`, `--text-muted`, and `--text-faint` establish a three-step content hierarchy.
- `--inverse` appears on dark filled controls such as the main action button and transport play button.
- `--accent-mint`, `--accent-blue`, `--accent-amber`, and `--accent-danger` are applied through component accents, markers, and stateful details rather than through a fully defined semantic token layer.

## 3. Typography Rules

Typography score: 9/10. The system is now consistent at the token level and semantically structured for UI work, but it still relies on fallback-available local fonts instead of an explicitly loaded app font package, so cross-machine fidelity is improved rather than fully guaranteed.

### Font Families

- Primary interface font: `Inter`, falling back to modern system sans-serif faces.
- Operational and metadata font: `JetBrains Mono`, with `IBM Plex Mono`, `SFMono-Regular`, `Cascadia Mono`, and `Roboto Mono` as fallbacks.
- Pairing principle: one neutral sans-serif workhorse for interface reading and one technical monospace companion for operational labels, metrics, and tabular data. This preserves contrast without introducing a third voice.

### Global Text Behavior

- Base line height: `1.45`
- Enabled font features: `cv02`, `cv03`, `cv04`, `tnum`
- Rendering strategy: legibility-first with no font synthesis, normal kerning, and optical sizing enabled where supported.

### Primitive Type Tokens

- Font families:
  - `--font-family-ui`
  - `--font-family-mono`
- Weights:
  - `--font-weight-regular`
  - `--font-weight-medium`
  - `--font-weight-semibold`
  - `--font-weight-bold`
- Scale:
  - `--font-size-2xs` = `10px`
  - `--font-size-xs` = `11px`
  - `--font-size-sm` = `12px`
  - `--font-size-md` = `13px`
  - `--font-size-lg` = `15px`
  - `--font-size-xl` = `16px`
  - `--font-size-2xl` = `18px`
  - `--font-size-3xl` = `22px`
  - `--font-size-4xl` = `25px`
- Leading:
  - `--leading-flat`
  - `--leading-tight`
  - `--leading-snug`
  - `--leading-ui`
  - `--leading-body`
  - `--leading-relaxed`
- Tracking:
  - `--tracking-dense`
  - `--tracking-normal`
  - `--tracking-wide`
  - `--tracking-caps`

### Semantic Type Tokens

- `--type-app-title-*`
  - Role: compact brand and shell titles.
- `--type-hero-*`
  - Role: primary page headers and major screen statements.
- `--type-section-title-*`
  - Role: secondary titles, focused panel headings, and emphasized card values.
- `--type-metric-*`
  - Role: KPI numbers and dense numeric callouts that must scan quickly.
- `--type-body-*`
  - Role: default UI copy and primary content lines.
- `--type-support-*`
  - Role: descriptive secondary copy that still needs comfortable reading.
- `--type-control-*`
  - Role: buttons, tabs, list rows, and compact action surfaces.
- `--type-data-*`
  - Role: metadata, timestamps, tags, counters, plugin states, and inspector facts.
- `--type-label-*`
  - Role: uppercase mono section labels and structural headers.
- `--type-micro-label-*`
  - Role: smallest uppercase markers such as table heads, chips, and key hints.

### Semantic Text Color Tokens

- `--type-body-color`
  - Role: primary reading text and strongest textual emphasis.
- `--type-support-color`
  - Role: secondary explanatory copy.
- `--type-control-color`
  - Role: default text on neutral controls and interactive rows.
- `--type-control-color-strong`
  - Role: active and hovered control text where the UI needs stronger emphasis.
- `--type-control-color-inverse`
  - Role: text placed on filled dark controls.
- `--type-data-color`
  - Role: tertiary metadata, timestamps, compact secondary facts.
- `--type-data-color-strong`
  - Role: denser metadata that still sits below primary reading text.
- `--type-label-color`
  - Role: uppercase structural section labels.
- `--type-micro-label-color`
  - Role: smallest utility labels and key hints.
- `--type-accent-blue-color`, `--type-accent-amber-color`, `--type-accent-danger-color`
  - Role: semantic status text accents for informational, warning, and danger states.

### Typographic Roles

- Sans-serif text carries primary headings, body copy, button labels, and general interface content.
- Monospace text is used broadly across the operational layer: counts, labels, metadata, timelines, tags, statuses, KPI labels, and most non-title table cells.
- Tabular figures are part of the visual system and should remain enabled anywhere metrics or counts are shown.
- Heading copy uses tighter tracking and tighter leading to create a crisp console-like rhythm.
- Descriptive paragraphs and supporting text use looser leading to avoid the compressed feeling common in dense desktop UIs.

### Type Scale

- `10px`: micro labels, table heads, chip text, keyboard hints
- `11px`: mono metadata, counters, timestamps, structural labels
- `12px`: control copy, segmented controls, quiet actions, secondary support text
- `13px`: default body copy and emphasized row titles
- `15px`: compact shell titles and restrained branding moments
- `16px` to `18px`: current-track emphasis, inspector headings, storage and panel titles
- `22px` to `28px`: KPI emphasis and major page headings through fluid scaling

### Typography Contract

Typography should feel compact, stable, and instrument-like. Uppercase mono labels are used as structural markers, not as decorative branding. Large type is limited to page headings, KPI values, and focused item titles.

### Styling Best Practices

- Use semantic tokens rather than raw pixel values in component styles.
- Use semantic text color tokens rather than `--text`, `--text-muted`, `--text-faint`, or accent colors directly on type.
- Keep body and support copy in the sans-serif family unless there is a data-specific reason to switch to mono.
- Use monospace selectively for metadata and measurable values; do not let it become the default voice of the interface.
- Preserve tabular numerals for counts, durations, queue rates, and storage values.
- Use balanced wrapping on large headings and prettier wrapping on descriptive paragraphs when the runtime supports it.
- Tighten tracking slightly for major headings, but keep body tracking neutral for sustained readability.
- Avoid introducing additional type sizes unless a new semantic role appears first.

## 4. Geometry, Shape, And Depth

### Radius System

- `--radius-sm: 6px`
- `--radius-md: 8px`
- `--radius-lg: 10px`
- Pill treatments use `99px`

### Shape Language

- Small controls use gently rounded corners.
- Inputs, toggles, and segmented controls use medium-soft corners.
- Large panels use slightly broader rounding, but never become soft or playful.
- Status chips, tags, and meters use pill geometry for quick scanning and contrast against rectangular layouts.

### Depth Model

This system is intentionally flat. Separation is created with border lines, layered neutrals, and inset emphasis rather than drop shadows. Background contrast is subtle and should remain subtle. When something becomes active, it usually shifts to a muted surface or gains an inset stroke instead of lifting visually.

## 5. Spacing & Density Principles

The spacing system should be explicit and token-driven rather than inferred from repeated raw pixel values. Mantra is a dense desktop workspace, so spacing must feel compact without becoming irregular. The target rhythm is a restrained modular scale built from a small number of reusable steps.

### Spacing Tokens

- `--space-1 = 1px`
  - Role: optical nudges only, never a general layout step.
- `--space-2 = 2px`
  - Role: hairline internal offsets, tiny chip insets, and micro separations inside already compact controls.
- `--space-3 = 3px`
  - Role: micro insets inside segmented controls and dense visualizers where `2px` is too tight and `4px` is too open.
- `--space-4 = 4px`
  - Role: the smallest repeatable stack gap for tightly coupled text or metadata.
- `--space-6 = 6px`
  - Role: compact internal padding for dense list rows and utility controls.
- `--space-8 = 8px`
  - Role: default compact gap and compact inline padding for pills, metadata cards, and small controls.
- `--space-12 = 12px`
  - Role: standard component padding and the default medium gap inside panels and toolbars.
- `--space-16 = 16px`
  - Role: default panel-to-panel spacing and shell padding inside the central workspace.
- `--space-24 = 24px`
  - Role: large shell-level separation such as sidebar section rhythm.

### Semantic Spacing Aliases

- `--space-stack-xs`
  - Role: smallest vertical grouping inside one information block.
- `--space-stack-sm`
  - Role: default dense stack gap for list groups, metadata grids, and repeated utility items.
- `--space-stack-md`
  - Role: default toolbar and card-internal rhythm.
- `--space-stack-lg`
  - Role: spacing between major blocks inside a panel or workspace.
- `--space-shell-gap`
  - Role: spacing between larger sidebar-level groups.
- `--space-shell-padding`
  - Role: outer shell inset.
- `--space-panel-padding`
  - Role: default card and panel inset.
- `--space-control-gap`
  - Role: icon-to-label spacing and compact horizontal action grouping.
- `--space-control-padding-inline`
  - Role: standard horizontal control padding.
- `--space-control-padding-inline-compact`
  - Role: compact horizontal control padding for tighter pills and rows.
- `--space-control-padding-inline-tight`
  - Role: the densest safe inline padding, reserved for very small UI surfaces.
- `--space-table-head-offset`
  - Role: fixed alignment offset that keeps the first table header column locked to the track artwork and title block below it.

### Density Rules

- Most controls sit in the `29px` to `38px` height range.
- Table rows are intentionally compact and become even denser in compact mode.
- Metadata blocks use small internal padding with clear borders instead of large whitespace.
- Accent usage is restrained so density does not become visual noise.
- New UI work should prefer spacing tokens and aliases instead of introducing raw `px` values for gaps, margins, and padding.
- Avoid near-duplicate values such as `5px`, `7px`, `9px`, `11px`, `14px`, `18px`, and `22px` when an existing token already communicates the intended role.
- Use tighter steps for internal control anatomy and larger steps only for panel rhythm, never mix both scales inside the same component without a structural reason.

### Control Measurements

- Source navigation rows: `38px` minimum height
- Collection rows: `29px` minimum height
- Search field and primary topbar buttons: `38px` height
- Segmented control buttons: `30px` height
- Toolbar icon buttons: `31px` square
- Density toggle: `31px` height
- Track rows: `62px` default, `52px` in compact mode
- Table header: `34px` minimum height
- Cover thumbnail inside rows: `34px` square
- Inspector artwork placeholder: `180px` height
- Waveform panel: `56px` height

### Interaction Treatment

- Hover commonly shifts a surface to `--panel-muted`.
- Active selection commonly adds either a muted background or an inset border.
- Focus states use a thin `--accent-blue` outline with offset.
- Filled actions invert the foreground and use `--text` as the background color.

## 6. Layout Principles

### Desktop-First Shell

The interface is designed as a desktop application shell with persistent zones:

- Left sidebar for navigation and collection management
- Central workspace for search, dashboard context, and primary data work
- Inline inspector for selected-item detail
- Right rail for playback, plugin activity, and temporal telemetry

This structure should be preserved when extending the application. The product is not currently modeled as a mobile-first system.

### Shell Measurements

- App shell columns: `248px minmax(620px, 1fr) 292px`
- Body minimum width: `1120px`
- Main content split: `minmax(520px, 1fr) 258px`
- Track table row template:
  - `minmax(230px, 1.8fr)`
  - `minmax(160px, 1.2fr)`
  - `88px`
  - `64px`
  - `68px`
  - `68px`
  - `84px`

### Grid Behavior

- Main shell: three-column grid with fixed-width rails and a flexible center.
- Workspace: vertical stack of topbar, page summary, and content area.
- Content area: split between a table-heavy work surface and a narrow inspector.
- Tables: wide, scrollable, and optimized for scanability rather than aggressive collapse.

### Responsive Strategy

- Under `1320px`, the content grid collapses to one column, the inspector disappears, and table columns tighten to:
  - `minmax(210px, 1.6fr)`
  - `minmax(120px, 1fr)`
  - `62px`
  - `52px`
  - `52px`
  - `58px`
  - `72px`
- Under `1160px`, body minimum width becomes `980px`, the right rail disappears, the shell becomes `220px minmax(560px, 1fr)`, and the library header becomes a single column.
- The application still maintains a desktop minimum width and should not be treated as a phone layout.

## 7. Component Stylings

### Navigation

- Source items are horizontal selectors with icon, label, and right-aligned count.
- Active navigation uses a muted surface plus inset border treatment.
- Collection rows are simpler, lighter, and subordinate to source navigation.

### Search And Toolbar

- Search is a bordered inline shell with icon, text field, and keyboard shortcut hint.
- Quiet buttons are outlined surface actions.
- Solid buttons are dark filled actions with inverse text.
- Utility icon buttons stay square, compact, and visually secondary.

### Summary Blocks

- Header KPIs live in subtle cards inside a larger bordered hero panel.
- Storage, metadata, and queue entries reuse a flat-card vocabulary with thin borders, muted or panel backgrounds, compact padding, and crisp numeric emphasis.
- Audit rows are slightly leaner: bordered and rounded like the other utility blocks, but without their own explicit background fill.

### Data Table

- The table is a scrollable grid with sticky column headers.
- Rows are interactive, dense, and text-truncated by default.
- Status values are rendered as outline pills using accent-colored text and borders.
- Compact mode only changes row height, preserving the rest of the layout contract.

### Inspector

- The inspector is a compact review surface with large media placeholder, title block, metadata cells, tags, and maintenance summaries.
- It is meant for focused inspection, not for deep editing forms.

### Right Rail

- Rail panels stack vertically with equal visual weight.
- Now Playing is the only panel with a stronger emotional cue through waveform and transport controls, but it still obeys the same flat structural rules.
- Activity cards and timeline rows remain monospace-friendly, compact, and operational.
