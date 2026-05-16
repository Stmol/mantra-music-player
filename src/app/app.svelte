<script lang="ts">
  import {
    Button,
    Checkbox,
    Chip,
    Icon,
    Modal,
    Popover,
    RadioButton,
    Section,
    Select,
    Switch,
    TextField,
  } from "../shared/ui";

  type DemoTheme = "dark" | "light";

  const providerOptions = [
    { label: "Local library", value: "local" },
    { label: "Bandcamp provider", value: "bandcamp" },
    { label: "SoundCloud provider", value: "soundcloud" },
    { disabled: true, label: "Spotify provider unavailable", value: "spotify" },
  ];

  const viewLayoutOptions = [{ label: "Justified", value: "justified" }];
  const viewSortOptions = [{ label: "Global Settings", value: "global" }];
  const viewInfoOptions = [{ label: "Tags", value: "tags" }];

  const typographySamples = [
    {
      label: "Modal title",
      meta: "24px / 36px / 600",
      className: "mantra-demo-type--modal-title",
      text: "Preferences",
    },
    {
      label: "Dialog title",
      meta: "16px / 24px / 600",
      className: "mantra-demo-type--dialog-title",
      text: "General",
    },
    {
      label: "Update heading",
      meta: "16px / 22px / 600",
      className: "mantra-demo-type--update-heading",
      text: "Launch Items",
    },
    {
      label: "Sidebar item",
      meta: "13px / 26px / 400",
      className: "mantra-demo-type--sidebar-item",
      text: "Trash",
    },
    {
      label: "Control text",
      meta: "14px / 36px / 400",
      className: "mantra-demo-type--control",
      text: "Refresh",
    },
    {
      label: "Paragraph",
      meta: "13px / 20px / 400",
      className: "mantra-demo-type--paragraph",
      text: "Show menu icon",
    },
    {
      label: "Secondary text",
      meta: "13px / 18px / 400",
      className: "mantra-demo-type--secondary",
      text: "Notify me when importing duplicates",
    },
    {
      label: "Section label",
      meta: "12px / 18px / 600",
      className: "mantra-demo-type--section-label",
      text: "Appearance",
    },
    {
      label: "Sidebar label",
      meta: "12px / 24px / 400",
      className: "mantra-demo-type--sidebar-label",
      text: "Smart Folders(3)",
    },
    {
      label: "Mono text",
      meta: "13px / 18px / mono",
      className: "mantra-demo-type--mono",
      text: "mantra.provider.local.scan()",
    },
  ];

  let currentTheme = $state<DemoTheme>("dark");
  let searchValue = $state("Glass Animals");
  let errorValue = $state("bad://playlist");
  let notesValue = $state("");
  let minValue = $state("");
  let maxValue = $state("");
  let providerValue = $state("local");
  let viewLayoutValue = $state("justified");
  let viewSortValue = $state("global");
  let viewInfoValue = $state("tags");
  let radioButtonScrollMode = $state("prev-next");
  let radioButtonLaunchMode = $state("eagle");
  let checkboxChecked = $state(true);
  let checkboxIndeterminate = $state(false);
  let compactMode = $state(false);
  let liveUpdates = $state(true);
  let modalOpen = $state(false);
  let popoverOpen = $state(false);

  const nextTheme = $derived(currentTheme === "dark" ? "light" : "dark");

  const toggleTheme = () => {
    currentTheme = nextTheme;
  };

  $effect(() => {
    globalThis.document.documentElement.dataset["theme"] = currentTheme;
  });
</script>

<main class="mantra-app mantra-demo" aria-label="Mantra Music Player">
  <section class="mantra-demo__hero">
    <div>
      <p class="mantra-demo__eyebrow">Mantra UI Debug Demo</p>
      <h1>Base component style preview</h1>
      <p>
        A temporary screen for checking Eagle-inspired tokens, light and dark
        themes, and shared UI component states.
      </p>
    </div>

    <div class="mantra-demo__hero-actions">
      <Button variant="primary" onclick={() => (modalOpen = true)}
        >Open modal</Button
      >
      <Button variant="secondary" onclick={toggleTheme}
        >Switch to {nextTheme} theme</Button
      >
    </div>
  </section>

  <div class="mantra-demo__grid">
    <Section
      class="mantra-demo__section--wide"
      description="Real UI typography patterns copied from Eagle dialogs, sidebars, controls, labels, and descriptions."
      title="Typography"
    >
      <div class="mantra-demo__typography-list">
        {#each typographySamples as item}
          <article class="mantra-demo__typography-sample">
            <div class="mantra-demo__typography-meta">
              <span class="mantra-demo__typography-label">{item.label}</span>
              <span>{item.meta}</span>
            </div>
            <p class={item.className}>{item.text}</p>
          </article>
        {/each}
      </div>
    </Section>

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
            <button aria-label="Copy API token" type="button">
              <Icon name="copy" />
            </button>
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
      description="Native radio choices copied from Eagle control styling."
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
            label="View in Eagle"
            name="launch-mode"
            value="eagle"
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
      description="Tag and folder pills from the Eagle inspector."
      title="Chips"
    >
      <div class="mantra-demo__chip-stack">
        <div class="mantra-demo__chip-group">
          <span class="mantra-demo-type--info-section-label">Tags</span>
          <div class="mantra-demo__chip-row">
            <Chip removable>IMG</Chip>
            <Chip removable>animal</Chip>
            <Chip removable>chatgpt</Chip>
            <Chip create aria-label="Add tag" />
          </div>
        </div>

        <div class="mantra-demo__chip-group">
          <span class="mantra-demo-type--info-section-label">Folders</span>
          <div class="mantra-demo__chip-row">
            <Chip removable>Vibe Ride</Chip>
            <Chip create aria-label="Add folder" />
          </div>
        </div>
      </div>
    </Section>

    <div class="mantra-demo__popover-demo">
      <Popover
        bind:open={popoverOpen}
        class="mantra-demo__view-options-popover"
        placement="bottom"
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
          <div class="mantra-demo__popover-content">
            <div class="mantra-demo__popover-row">
              <span class="mantra-demo__popover-label">Layout</span>
              <Select
                bind:value={viewLayoutValue}
                class="mantra-demo__popover-select mantra-demo__popover-select--layout"
                options={viewLayoutOptions}
              >
                {#snippet leading()}
                  <Icon name="grid" />
                {/snippet}
              </Select>
            </div>

            <div class="mantra-demo__popover-separator"></div>

            <div class="mantra-demo__popover-row">
              <span class="mantra-demo__popover-label">Sort by</span>
              <div class="mantra-demo__popover-control-group">
                <Select
                  bind:value={viewSortValue}
                  class="mantra-demo__popover-select mantra-demo__popover-select--sort"
                  options={viewSortOptions}
                />
                <div class="mantra-demo__popover-segmented">
                  <Button
                    class="mantra-demo__popover-icon-action"
                    pressed
                    size="sm"
                    variant="ghost"
                  >
                    {#snippet leading()}
                      <Icon name="sort-asc" />
                    {/snippet}
                  </Button>
                  <Button
                    class="mantra-demo__popover-icon-action"
                    disabled
                    size="sm"
                    variant="ghost"
                  >
                    {#snippet leading()}
                      <Icon name="sort-desc" />
                    {/snippet}
                  </Button>
                </div>
              </div>
            </div>

            <div class="mantra-demo__popover-separator"></div>

            <Switch
              checked
              class="mantra-demo__popover-switch"
              label="Show Name"
            />
            <div class="mantra-demo__popover-row">
              <span class="mantra-demo__popover-label">Show item info</span>
              <div class="mantra-demo__popover-control-group">
                <Select
                  bind:value={viewInfoValue}
                  class="mantra-demo__popover-select mantra-demo__popover-select--info"
                  options={viewInfoOptions}
                >
                  {#snippet leading()}
                    <Icon name="bookmark" />
                  {/snippet}
                </Select>
                <Switch
                  checked
                  aria-label="Show item info"
                  class="mantra-demo__popover-inline-switch"
                />
              </div>
            </div>
            <Switch
              checked
              class="mantra-demo__popover-switch"
              label="Show extension"
            />
            <Switch
              checked
              class="mantra-demo__popover-switch"
              label="Show extension label"
            />
            <Switch
              disabled
              class="mantra-demo__popover-switch"
              label="Show annotation"
            />
            <Switch
              disabled
              class="mantra-demo__popover-switch"
              label="Show subfolder contents"
            />

            <div class="mantra-demo__popover-separator"></div>

            <Switch
              checked
              class="mantra-demo__popover-switch"
              label="Show sidebar"
            />
            <Switch
              checked
              class="mantra-demo__popover-switch"
              label="Show inspector"
            />

            <div class="mantra-demo__popover-separator"></div>

            <Button block size="sm" variant="secondary">Refresh</Button>
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
        <p class="mantra-demo-type--paragraph">
          Password Lock protects local library settings while the app is away.
        </p>
        <Button variant="ghost">Change Password...</Button>
        <Button variant="ghost">Lock Now</Button>
      </div>
    </Section>
  </div>

  <Modal
    bind:open={modalOpen}
    description="This temporary modal shows the shared dialog styling and action layout."
    id="debug-demo-modal"
    title="Create provider plugin"
  >
    <div class="mantra-demo__modal-body">
      <TextField label="Plugin name" placeholder="Bandcamp provider" />
      <TextField
        label="Package id"
        placeholder="com.mantra.provider.bandcamp"
      />
      <Checkbox checked label="Enable after creation" />
    </div>

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
