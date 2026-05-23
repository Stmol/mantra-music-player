<script lang="ts">
  import {
    Button,
    Checkbox,
    Chip,
    Icon,
    IconButton,
    IconTabs,
    Modal,
    Popover,
    RadioButton,
    Section,
    Select,
    Switch,
    Tabs,
    TextField,
    Tooltip,
  } from "../../shared/ui";
  import type { IconTabsItem } from "../../shared/ui";
  import type { UiDemoScreenProperties } from "./types";

  let { nextTheme, onToggleTheme }: UiDemoScreenProperties = $props();

  const providerOptions = [
    { label: "Local library", value: "local" },
    { label: "Bandcamp provider", value: "bandcamp" },
    { label: "SoundCloud provider", value: "soundcloud" },
    { disabled: true, label: "Spotify provider unavailable", value: "spotify" },
  ];

  const viewLayoutOptions = [{ label: "Justified", value: "justified" }];
  const viewSortOptions = [{ label: "Global Settings", value: "global" }];
  const viewInfoOptions = [{ label: "Tags", value: "tags" }];
  const shortcutKeyElement = "key";
  const popoverTabItems = [
    { label: "Window", value: "window" },
    { label: "Format", value: "format" },
    { label: "Inspector", value: "inspector" },
    { label: "Development", value: "development" },
  ];
  const sortDirectionItems: IconTabsItem[] = [
    { icon: "sort-asc", label: "Sort ascending", value: "ascending" },
    { icon: "sort-desc", label: "Sort descending", value: "descending" },
  ];
  const viewModeItems: IconTabsItem[] = [
    { icon: "grid", label: "Grid view", value: "grid" },
    { icon: "bookmark", label: "Bookmark view", value: "bookmark" },
    { icon: "search", label: "Search view", value: "search" },
  ];
  const libraryModeItems: IconTabsItem[] = [
    { icon: "grid", label: "Layout", value: "layout" },
    { icon: "sort-asc", label: "Ascending", value: "ascending" },
    { icon: "sort-desc", label: "Descending", value: "descending" },
    { disabled: true, icon: "filter", label: "Filtered", value: "filtered" },
  ];

  const typographyBase =
    "fontFamily-lato fontWeight-regular lineHieght-extraTight";

  const typographySamples = [
    {
      className: `${typographyBase} fontSize-xxxxl textColor-black`,
      text: "Scale xxxxl",
    },
    {
      className: `${typographyBase} fontSize-xxxl textColor-black`,
      text: "Scale xxxl",
    },
    {
      className: `${typographyBase} fontSize-xxl textColor-black`,
      text: "Scale xxl",
    },
    {
      className: `${typographyBase} fontSize-xl textColor-black`,
      text: "Scale xl",
    },
    {
      className: `${typographyBase} fontSize-l textColor-black`,
      text: "Scale l",
    },
    {
      className: `${typographyBase} fontSize-m textColor-black`,
      text: "Scale m",
    },
    {
      className: `${typographyBase} fontSize-s textColor-slate`,
      text: "Scale s",
    },
    {
      className: `${typographyBase} fontSize-xs textColor-slate`,
      text: "Scale xs",
    },
    {
      className:
        "fontFamily-lato fontWeight-regular fontSize-s lineHieght-readable textColor-slate",
      text: "Readable line height on size s.",
    },
    {
      className: `${typographyBase} fontSize-s textColor-primary`,
      text: "textColor-primary",
    },
    {
      className: `${typographyBase} fontSize-s textColor-ui-warning`,
      text: "textColor-ui-warning",
    },
    {
      className:
        "fontSize-xs font-mono fontWeight-regular lineHieght-extraTight textColor-black",
      text: "mantra.provider.local.scan()",
    },
  ];

  let searchValue = $state("Glass Animals");
  let errorValue = $state("bad://playlist");
  let notesValue = $state("");
  let minValue = $state("");
  let maxValue = $state("");
  let providerValue = $state("local");
  let viewLayoutValue = $state("justified");
  let viewSortValue = $state("global");
  let viewInfoValue = $state("tags");
  let popoverTabValue = $state("window");
  let sortDirectionValue = $state("descending");
  let popoverSortDirectionValue = $state("descending");
  let viewModeValue = $state("grid");
  let libraryModeValue = $state("ascending");
  let showItemInfo = $state(true);
  let radioButtonScrollMode = $state("prev-next");
  let radioButtonLaunchMode = $state("library");
  let checkboxChecked = $state(true);
  let checkboxIndeterminate = $state(false);
  let compactMode = $state(false);
  let liveUpdates = $state(true);
  let sectionsVisible = $state(true);
  let modalOpen = $state(false);
  let popoverOpen = $state(false);
</script>

<main
  class={`mantra-app mantra-demo${sectionsVisible ? "" : " mantra-demo--plain-sections"}`}
  aria-label="Mantra UI debug demo"
>
  <section class="mantra-demo__hero">
    <div>
      <p class="mantra-demo__eyebrow">Mantra UI Debug Demo</p>
      <h1>Base component style preview</h1>
      <p>
        A temporary screen for checking Mantra tokens, light and dark themes,
        and shared UI component states.
      </p>
    </div>

    <div class="mantra-demo__hero-actions">
      <Button variant="primary" onclick={() => (modalOpen = true)}
        >Open modal</Button
      >
      <Button variant="secondary" onclick={onToggleTheme}
        >Switch to {nextTheme} theme</Button
      >
      <Button
        aria-pressed={!sectionsVisible}
        variant="secondary"
        onclick={() => (sectionsVisible = !sectionsVisible)}
        >Switch Sections</Button
      >
    </div>
  </section>

  <div class="mantra-demo__grid">
    <Section
      description="Variants, sizes, loading, disabled, and pressed states."
      title="Buttons"
    >
      <div class="mantra-demo__stack">
        <div class="mantra-demo__row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <div class="mantra-demo__row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <div class="mantra-demo__row">
          <Button loading variant="primary">Loading</Button>
          <Button disabled>Disabled</Button>
          <Button pressed variant="secondary">Pressed</Button>
        </div>
      </div>
    </Section>

    <Section
      description="Neutral, search, readonly action, compact sizing, and error state."
      title="Text fields"
    >
      <div class="mantra-demo__stack">
        <TextField
          bind:value={searchValue}
          label="Search"
          placeholder="Search..."
          type="search"
        >
          {#snippet leading()}
            <Icon name="search" />
          {/snippet}
        </TextField>

        <TextField
          label="API Token"
          readonly
          value="105df84d-e1f1-45e4-8c77-4d6ae19c7d7f"
        >
          {#snippet trailing()}
            <IconButton icon="copy" label="Copy API token" />
          {/snippet}
        </TextField>

        <TextField
          bind:value={notesValue}
          label="Notes"
          placeholder="Notes..."
        />

        <div class="mantra-demo__panel-header-field">
          <TextField
            appearance="panel-header"
            placeholder="Search..."
            type="search"
          >
            {#snippet leading()}
              <Icon name="search" />
            {/snippet}
          </TextField>
        </div>

        <TextField
          bind:value={errorValue}
          error="Provider URL must start with https://"
          label="Provider URL"
          tone="danger"
        />

        <div class="mantra-demo__row">
          <TextField
            bind:value={minValue}
            class="mantra-demo__range-field"
            inputSize="sm"
            placeholder="Min"
          />
          <TextField
            bind:value={maxValue}
            class="mantra-demo__range-field"
            inputSize="sm"
            placeholder="Max"
          />
        </div>
      </div>
    </Section>

    <Section
      description="Native dropdown styling for provider and settings choices."
      title="Select"
    >
      <div class="mantra-demo__stack">
        <Select
          bind:value={providerValue}
          description="Uses the same control height, border, and focus language as TextField."
          label="Music provider"
          options={providerOptions}
        />

        <Select
          error="A provider must be selected before import."
          label="Error select"
          options={[
            { label: "Choose provider", value: "" },
            ...providerOptions,
          ]}
          value=""
        />
      </div>
    </Section>

    <Section
      description="Checked, unchecked, disabled, and hover states."
      title="Checkboxes"
    >
      <div class="mantra-demo__stack">
        <Checkbox
          bind:checked={checkboxChecked}
          label="Enable transparency effects"
        />

        <Checkbox
          bind:checked={checkboxIndeterminate}
          label="Show count on the sidebar"
        />

        <Checkbox checked label="Show menu icon" />
        <Checkbox disabled label="Disabled checkbox" />
      </div>
    </Section>

    <Section
      description="Native radio choices using shared control styling."
      title="Radio buttons"
    >
      <div class="mantra-demo__stack">
        <div class="mantra-demo__radio-grid">
          <RadioButton
            bind:group={radioButtonScrollMode}
            label="Vertical Scroll"
            name="scroll-mode"
            value="vertical-scroll"
          />
          <RadioButton
            bind:group={radioButtonScrollMode}
            label="Prev/Next"
            name="scroll-mode"
            value="prev-next"
          />
          <RadioButton
            bind:group={radioButtonScrollMode}
            label="Zoom in/out"
            name="scroll-mode"
            value="zoom"
          />
        </div>

        <div class="mantra-demo__radio-grid">
          <RadioButton checked label="Enable" name="binary-mode" />
          <RadioButton label="Disable" name="binary-mode" />
        </div>

        <div class="mantra-demo__radio-grid">
          <RadioButton
            bind:group={radioButtonLaunchMode}
            label="View in library"
            name="launch-mode"
            value="library"
          />
          <RadioButton
            bind:group={radioButtonLaunchMode}
            label="Open With Default App"
            name="launch-mode"
            value="default-app"
          />
          <RadioButton
            bind:group={radioButtonLaunchMode}
            label="Open in new window"
            name="launch-mode"
            value="new-window"
          />
          <RadioButton
            bind:group={radioButtonLaunchMode}
            label="Default"
            name="launch-mode"
            value="default"
          />
          <RadioButton
            bind:group={radioButtonLaunchMode}
            label="Run Plugin"
            name="launch-mode"
            value="plugin"
          />
          <RadioButton disabled label="Disabled radio" name="disabled-mode" />
        </div>
      </div>
    </Section>

    <Section
      description="Toggle rows in active, inactive, and disabled states."
      title="Switches"
    >
      <div class="mantra-demo__stack">
        <Switch
          bind:checked={liveUpdates}
          description="Refresh provider metadata while the app is open."
          label="Live metadata updates"
        />

        <Switch
          bind:checked={compactMode}
          description="Reduce row height in dense music lists."
          label="Compact library rows"
        />

        <Switch checked disabled label="Disabled switch" />
      </div>
    </Section>

    <Section
      description="Tag and folder pills for metadata panels."
      title="Chips"
    >
      <div class="mantra-demo__chip-stack">
        <div class="mantra-demo__chip-group">
          <span class="fontSize-xs fontWeight-bold textColor-sliver">Tags</span>
          <div class="mantra-demo__chip-row">
            <Chip removable>IMG</Chip>
            <Chip removable>animal</Chip>
            <Chip removable>chatgpt</Chip>
            <Chip create aria-label="Add tag" />
          </div>
        </div>

        <div class="mantra-demo__chip-group">
          <span class="fontSize-xs fontWeight-bold textColor-sliver"
            >Folders</span
          >
          <div class="mantra-demo__chip-row">
            <Chip removable>Vibe Ride</Chip>
            <Chip create aria-label="Add folder" />
          </div>
        </div>
      </div>
    </Section>

    <Section
      description="Hover and focus hints for actions, labels, shortcuts, and fields."
      title="Tooltips"
    >
      <div class="mantra-demo__stack">
        <div class="mantra-demo__row">
          <Tooltip label="Order By" placement="bottom">
            <Button size="sm" variant="ghost">
              {#snippet leading()}
                <Icon name="sort-asc" />
              {/snippet}
              Order
            </Button>
          </Tooltip>

          <Tooltip placement="bottom">
            {#snippet content()}
              Add Category <svelte:element this={shortcutKeyElement}
                >F</svelte:element
              >
            {/snippet}
            <IconButton icon="plus" label="Add category" variant="chip-add" />
          </Tooltip>
        </div>

        <div class="mantra-demo__chip-row">
          <Tooltip label="#1C0F04 (0.7%)">
            <Chip>#1C0F04</Chip>
          </Tooltip>
          <Tooltip placement="right">
            {#snippet content()}
              Color <svelte:element this={shortcutKeyElement}>C</svelte:element>
            {/snippet}
            <Chip removable>Color</Chip>
          </Tooltip>
        </div>

        <Tooltip label="Search library by title, artist, or album">
          <TextField placeholder="Hover the field..." type="search">
            {#snippet leading()}
              <Icon name="search" />
            {/snippet}
          </TextField>
        </Tooltip>
      </div>
    </Section>

    <Section
      description="Icon-only segmented tabs using shared segmented controls."
      title="Icon tabs"
    >
      <div class="mantra-demo__stack">
        <div class="mantra-demo__row">
          <IconTabs
            bind:activeValue={sortDirectionValue}
            aria-label="Sort direction"
            items={sortDirectionItems}
            tabIdPrefix="mantra-demo-sort-direction"
          />
        </div>

        <div class="mantra-demo__row">
          <IconTabs
            bind:activeValue={viewModeValue}
            aria-label="View mode"
            items={viewModeItems}
            tabIdPrefix="mantra-demo-view-mode"
          />
        </div>

        <div class="mantra-demo__row">
          <IconTabs
            bind:activeValue={libraryModeValue}
            aria-label="Library mode"
            items={libraryModeItems}
            tabIdPrefix="mantra-demo-library-mode"
          />
        </div>
      </div>
    </Section>

    <Section
      description="Popover tab navigation for search and plugin panels."
      title="Tabs"
    >
      <div class="mantra-demo__tabs-preview">
        <Tabs
          bind:activeValue={popoverTabValue}
          aria-label="Plugin search categories"
          items={popoverTabItems}
          panelId="mantra-demo-popover-tab-panel"
          tabIdPrefix="mantra-demo-popover-tab"
        />

        <div
          aria-labelledby={`mantra-demo-popover-tab-${popoverTabValue}`}
          class="mantra-demo__tabs-preview-panel"
          id="mantra-demo-popover-tab-panel"
          role="tabpanel"
        >
          <span class="mantra-demo__preview-label">
            {popoverTabItems.find((item) => item.value === popoverTabValue)
              ?.label}
          </span>
        </div>
      </div>
    </Section>

    <div class="mantra-demo__popover-demo">
      <Popover
        bind:open={popoverOpen}
        placement="bottom"
        surfaceSize="lg"
        triggerMode="custom"
      >
        {#snippet trigger(state)}
          <Button
            aria-expanded={state.open}
            aria-haspopup="dialog"
            onclick={state.toggle}
            pressed={state.open}
            size="md"
            variant="secondary"
          >
            {#snippet leading()}
              <Icon name="filter" />
            {/snippet}
            View options
          </Button>
        {/snippet}

        {#snippet children()}
          <div class="popover-menu">
            <div class="popover-menu__row">
              <span class="popover-menu__label">Layout</span>
              <Select
                bind:value={viewLayoutValue}
                controlWidth="md"
                options={viewLayoutOptions}
              >
                {#snippet leading()}
                  <Icon name="grid" />
                {/snippet}
              </Select>
            </div>

            <div class="popover-menu__separator"></div>

            <div class="popover-menu__row">
              <span class="popover-menu__label">Sort by</span>
              <div class="popover-menu__control-group">
                <Select
                  bind:value={viewSortValue}
                  controlWidth="md"
                  options={viewSortOptions}
                />
                <IconTabs
                  bind:activeValue={popoverSortDirectionValue}
                  aria-label="Sort direction"
                  items={sortDirectionItems}
                  tabIdPrefix="mantra-demo-popover-sort-direction"
                />
              </div>
            </div>

            <div class="popover-menu__separator"></div>

            <Switch checked label="Show Name" />
            <div class="popover-menu__row">
              <Button
                aria-controls="mantra-demo-show-item-info"
                onclick={() => (showItemInfo = !showItemInfo)}
                size="sm"
                variant="text"
              >
                Show item info
              </Button>
              <div class="popover-menu__control-group">
                <Select
                  bind:value={viewInfoValue}
                  controlWidth="sm"
                  options={viewInfoOptions}
                >
                  {#snippet leading()}
                    <Icon name="bookmark" />
                  {/snippet}
                </Select>
                <Switch
                  bind:checked={showItemInfo}
                  aria-label="Show item info"
                  id="mantra-demo-show-item-info"
                />
              </div>
            </div>
            <Switch checked label="Show extension" />
            <Switch checked label="Show extension label" />
            <Switch disabled label="Show annotation" />
            <Switch disabled label="Show subfolder contents" />

            <div class="popover-menu__separator"></div>

            <Switch checked label="Show sidebar" />
            <Switch checked label="Show inspector" />

            <div class="popover-menu__separator"></div>

            <Button block size="md" variant="secondary">Refresh</Button>
          </div>
        {/snippet}
      </Popover>
    </div>

    <Section
      description="Dialog surface, title, description, content, and footer layout."
      title="Modal"
    >
      <div class="mantra-demo__stack">
        <Button variant="primary" onclick={() => (modalOpen = true)}
          >Show dialog</Button
        >
      </div>
    </Section>

    <Section disabled title="Password">
      <div class="mantra-demo__stack">
        <p class="fontSize-xs fontWeight-regular textColor-slate">
          Password Lock protects local library settings while the app is away.
        </p>
        <Button variant="ghost">Change Password...</Button>
        <Button variant="ghost">Lock Now</Button>
      </div>
    </Section>

    <Section
      class="mantra-demo__section--wide"
      description="Eagle typography utility classes from typography.css (fontSize, fontWeight, lineHieght, textColor, font-mono)."
      title="Typography"
    >
      <div class="mantra-demo__typography-list">
        {#each typographySamples as item, index (item.className)}
          <div class="mantra-demo__typography-item">
            {#if index > 0}
              <hr class="mantra-demo__typography-divider" />
            {/if}
            <p class={item.className}>{item.text}</p>
          </div>
        {/each}
      </div>
    </Section>
  </div>

  <Modal
    bind:open={modalOpen}
    description="This temporary modal shows the shared dialog styling and action layout."
    id="debug-demo-modal"
    title="Create provider plugin"
  >
    <TextField label="Plugin name" placeholder="Bandcamp provider" />
    <TextField label="Package id" placeholder="com.mantra.provider.bandcamp" />
    <Checkbox checked label="Enable after creation" />

    {#snippet footer()}
      <Button variant="primary" onclick={() => (modalOpen = false)}
        >Create</Button
      >
      <Button variant="secondary" onclick={() => (modalOpen = false)}
        >Cancel</Button
      >
    {/snippet}
  </Modal>
</main>

<style>
  .mantra-demo {
    gap: var(--spacing-m);
    overflow: auto;
    width: 100vw;
    height: 100vh;
    padding: var(--spacing-m);
  }

  .mantra-demo__hero {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-m);
    padding: var(--spacing-m);
    border-top: var(--box-border-top);
    border-right: var(--box-border-right);
    border-bottom: var(--box-border-bottom);
    border-left: var(--box-border-left);
    border-radius: var(--radius-modal);
    background: var(--box-background);
    box-shadow: var(--box-border-shadow);
  }

  .mantra-demo__hero h1 {
    margin: 0;
    font-size: var(--font-size-xxl);
    line-height: var(--line-height-tight);
  }

  .mantra-demo__hero p {
    margin: var(--spacing-xxs) 0 0;
    color: var(--color-text-secondary);
    line-height: var(--line-height-readable);
  }

  .mantra-demo__eyebrow {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-xs);
    text-transform: uppercase;
  }

  .mantra-demo__hero-actions,
  .mantra-demo__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .mantra-demo__popover-demo {
    display: flex;
    align-items: flex-start;
    grid-column: 1 / -1;
  }

  .mantra-demo__grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--mantra-demo-grid-min-column), 1fr)
    );
    gap: var(--spacing-m);
  }

  .mantra-demo__section--wide {
    grid-column: 1 / -1;
  }

  .mantra-demo--plain-sections :global(.section-surface__panel) {
    overflow: visible;
    padding: 0;
    border-color: transparent;
    border-radius: var(--radius-0);
    background-color: transparent;
  }

  .mantra-demo--plain-sections .mantra-demo__tabs-preview {
    margin: 0;
  }

  .mantra-demo__stack {
    display: grid;
    gap: var(--spacing-xs);
  }

  .mantra-demo__chip-stack {
    display: grid;
    gap: 0;
  }

  .mantra-demo__chip-group {
    width: 100%;
    margin-top: var(--mantra-info-section-offset);
    padding-top: var(--mantra-info-section-offset);
    border-top: var(--border-width) solid var(--color-border-secondary);
  }

  .mantra-demo__chip-group > span {
    display: flex;
    align-items: center;
    height: var(--mantra-info-section-label-height);
    margin-bottom: var(--mantra-label-container-gap);
  }

  .mantra-demo__chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mantra-label-container-gap);
    align-items: center;
  }

  .mantra-demo__typography-list {
    display: grid;
    gap: 0;
  }

  .mantra-demo__typography-divider {
    margin: 0;
    border: 0;
    border-top: var(--border-width) solid var(--color-border-secondary);
  }

  .mantra-demo__typography-item p {
    margin: 0;
    padding: var(--spacing-xs) 0;
  }

  .mantra-demo__range-field {
    width: var(--mantra-demo-range-field-width);
  }

  .mantra-demo__radio-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: var(--mantra-section-gap);
  }

  .mantra-demo__panel-header-field {
    display: flex;
    align-items: center;
    min-height: var(--mantra-field-control-height-lg);
    padding: 0 var(--mantra-select-padding-x) 0 0;
    gap: var(--mantra-segment-gap);
    box-shadow: 0 calc(var(--border-width) * -1) 0 0 inset
      var(--color-border-secondary);
  }

  .mantra-demo__panel-header-field :global(.text-field) {
    flex: 1;
  }

  .mantra-demo__tabs-preview {
    display: grid;
    gap: 0;
    margin: calc(var(--mantra-section-padding) * -1);
  }

  .mantra-demo__tabs-preview-panel {
    display: grid;
    min-height: var(--mantra-demo-tabs-preview-min-height);
    padding: var(--spacing-xs) var(--spacing-s);
    color: var(--color-text-primary);
    font-size: var(--font-size-xs);
    line-height: var(--mantra-control-text-line-height-md);
  }

  .mantra-demo__preview-label {
    color: var(--color-text-primary);
    font-size: var(--font-size-xs);
    line-height: var(--mantra-control-text-line-height-md);
  }
</style>
