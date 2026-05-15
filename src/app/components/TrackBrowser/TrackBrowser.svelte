<script lang="ts">
  import type { Track } from "../../data/types";

  interface Properties {
    tracks: Track[];
  }

  let { tracks }: Properties = $props();
</script>

<section class="track-browser" aria-label="Tracks">
  <div class="content-area">
    <section class="track-grid" aria-label="Track grid">
      {#each tracks as track}
        <article class:selected={track.active} class="track-card">
          <div
            class="cover-art"
            style:--cover-a={track.colors[0]}
            style:--cover-b={track.colors[2]}
            style:--cover-c={track.colors[4]}
          >
            <span class="file-badge">MP3</span>
            <span class="album-disc" aria-hidden="true"></span>
          </div>
          <div class="color-row" aria-label="Artwork colors">
            {#each track.colors as color}
              <span style:--swatch={color}></span>
            {/each}
          </div>
          <h2>{track.title}</h2>
          <p>{track.artist}</p>
          <div class="track-meta">
            <span>{track.album}</span>
            <span>{track.duration}</span>
          </div>
        </article>
      {/each}
    </section>

    <section class="empty-state" aria-label="Empty folder state">
      <div class="empty-folder" aria-hidden="true">
        <span></span>
      </div>
      <h2>Enjoy your day</h2>
      <p>You have no uncategorized tracks.</p>
    </section>
  </div>
</section>
