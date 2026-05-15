<script lang="ts">
  import AppSidebar from "./components/AppSidebar/AppSidebar.svelte";
  import AppToolbar from "./components/AppToolbar/AppToolbar.svelte";
  import TrackBrowser from "./components/TrackBrowser/TrackBrowser.svelte";
  import TrackInspector from "./components/TrackInspector/TrackInspector.svelte";
  import {
    filterTabs,
    folderItems,
    quickItems,
    smartItems,
    tracks,
  } from "./data/mock-data";

  const selectedTrack = tracks[0];
</script>

<main class="mantra-app" aria-label="Mantra Music Player">
  <section class="window-frame" aria-label="Music library workspace">
    <AppSidebar {quickItems} {smartItems} {folderItems} />

    <section class="workspace" aria-label="Track browser">
      <AppToolbar {filterTabs} />
      <TrackBrowser {tracks} />
    </section>

    {#if selectedTrack}
      <TrackInspector track={selectedTrack} />
    {/if}
  </section>
</main>
