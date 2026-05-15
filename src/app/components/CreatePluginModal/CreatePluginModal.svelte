<script lang="ts">
  import { X } from "lucide-svelte";

  const iconStroke = 1.25;
  const pluginTypes = [
    {
      title: "Window Plugin",
      description:
        "Running the plugin will pop up a UI window, allowing users to interact with the plugin.",
    },
    {
      title: "Background Service",
      description:
        "Extend Mantra with controlled background and metadata workflows.",
    },
    {
      title: "Format",
      description:
        "Extend unsupported file formats with thumbnails and preview tools.",
    },
    {
      title: "Inspector",
      description:
        "Add focused inspector panels for metadata and preview workflows.",
    },
  ] as const;
</script>

<section class="modal create-plugin" aria-label="Create plugin">
  <header>
    <h2>Create plugin</h2>
    <button
      class="ui-icon-button close-button"
      aria-label="Close create plugin"
    >
      <X size={22} strokeWidth={iconStroke} aria-hidden="true" />
    </button>
  </header>
  <div class="create-body">
    <label class="inspector-field full">
      <span>Plugin name</span>
      <input placeholder="Plugin name" aria-label="Plugin name" />
    </label>
    <div class="plugin-type-grid">
      {#each pluginTypes as type, index}
        <article class:selected={index === 0} class="plugin-type">
          <span class="radio-dot"></span>
          <div class="plugin-illustration" aria-hidden="true"></div>
          <h3>{type.title}</h3>
          <p>{type.description}</p>
        </article>
      {/each}
    </div>
    <footer>
      <button class="ui-button primary disabled">Create</button>
      <button class="ui-button secondary">Cancel</button>
    </footer>
  </div>
</section>
