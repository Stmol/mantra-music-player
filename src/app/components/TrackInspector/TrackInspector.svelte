<script lang="ts">
  import { ChevronRight, Pin, Upload } from "lucide-svelte";
  import type { Track } from "../../data/types";

  interface Properties {
    track: Track;
  }

  const iconStroke = 1.25;
  let { track }: Properties = $props();
</script>

<aside class="track-inspector" aria-label="Track inspector">
  <button class="ui-icon-button pin-button" aria-label="Pin inspector">
    <Pin size={18} strokeWidth={iconStroke} aria-hidden="true" />
  </button>

  <div class="preview-card">
    <div
      class="preview-art"
      style:--cover-a={track.colors[0]}
      style:--cover-b={track.colors[2]}
      style:--cover-c={track.colors[4]}
    >
      <span class="file-badge">MP3</span>
      <span class="album-disc large" aria-hidden="true"></span>
    </div>
    <div class="color-row inspector-colors">
      {#each track.colors as color}
        <span style:--swatch={color}></span>
      {/each}
    </div>
  </div>

  <div class="field-stack">
    <label class="inspector-field">
      <span>Name</span>
      <input value={track.title} aria-label="Track name" />
    </label>
    <label class="inspector-field">
      <span>Notes</span>
      <input placeholder="Notes..." aria-label="Track notes" />
    </label>
    <label class="inspector-field">
      <span>URL</span>
      <input placeholder="http://" aria-label="Track URL" />
    </label>
  </div>

  <div class="inspector-section">
    <h3>Tags</h3>
    <div class="tag-list">
      {#each track.tags.slice(0, 1) as tag}
        <span class="tag-pill"
          >{tag} <button aria-label="Remove {tag} tag">x</button></span
        >
      {/each}
      <button class="add-button" aria-label="Add tag">+</button>
    </div>
  </div>

  <div class="inspector-section">
    <h3>Folders</h3>
    <div class="tag-list">
      <span class="tag-pill green"
        >Music Library <button aria-label="Remove Music Library folder"
          >x</button
        ></span
      >
      <span class="tag-pill"
        >Drafts <button aria-label="Remove Drafts folder">x</button></span
      >
      <button class="add-button" aria-label="Add folder">+</button>
    </div>
  </div>

  <div class="inspector-section collapse-row">
    <h3>Audio Metadata</h3>
    <ChevronRight size={18} strokeWidth={iconStroke} aria-hidden="true" />
  </div>

  <div class="properties">
    <h3>Properties</h3>
    <dl>
      <div>
        <dt>Rating</dt>
        <dd class="stars">*****</dd>
      </div>
      <div>
        <dt>Bitrate</dt>
        <dd>320 kbps</dd>
      </div>
      <div>
        <dt>Size</dt>
        <dd>8.57 MB</dd>
      </div>
      <div>
        <dt>Type</dt>
        <dd>MP3</dd>
      </div>
      <div>
        <dt>Date Imported</dt>
        <dd>2026/04/27 16:48</dd>
      </div>
    </dl>
  </div>

  <button class="ui-button secondary wide-button">
    <Upload size={18} strokeWidth={iconStroke} aria-hidden="true" />
    Export
  </button>
</aside>
