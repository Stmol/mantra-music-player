<script lang="ts">
  import {
    Activity,
    Album,
    AudioLines,
    CircleDot,
    Clock3,
    Database,
    Disc3,
    Download,
    FolderSync,
    HardDrive,
    Headphones,
    ListFilter,
    Pause,
    Plug,
    Plus,
    RotateCw,
    Search,
    Settings2,
    Shuffle,
    SkipBack,
    SkipForward,
    SlidersHorizontal,
    Tags,
    Volume2,
    Wand2,
  } from "lucide-svelte";
  import type { UiDemoScreenProperties } from "./types";

  let { nextTheme, onToggleTheme }: UiDemoScreenProperties = $props();

  const sources = [
    { accent: "mint", count: "18.4K", icon: HardDrive, label: "Local Library" },
    { accent: "amber", count: "214", icon: Plug, label: "Providers" },
    { accent: "blue", count: "42", icon: FolderSync, label: "Imports" },
    { accent: "neutral", count: "8", icon: Wand2, label: "Rules" },
  ];

  const playlists = [
    { count: 128, label: "Inbox Review" },
    { count: 64, label: "Late Night Systems" },
    { count: 219, label: "Production Focus" },
    { count: 38, label: "Unmatched Metadata" },
  ];

  const tracks = [
    {
      accent: "mint",
      album: "Dreamland",
      artist: "Glass Animals",
      bitrate: "320",
      length: "3:58",
      plays: "42",
      source: "Local",
      status: "Matched",
      title: "Heat Waves",
      year: "2020",
    },
    {
      accent: "blue",
      album: "In Colour",
      artist: "Jamie xx",
      bitrate: "256",
      length: "4:14",
      plays: "17",
      source: "Bandcamp",
      status: "Review",
      title: "Loud Places",
      year: "2015",
    },
    {
      accent: "neutral",
      album: "Migration",
      artist: "Bonobo",
      bitrate: "FLAC",
      length: "5:45",
      plays: "31",
      source: "Local",
      status: "Clean",
      title: "Kerala",
      year: "2017",
    },
    {
      accent: "amber",
      album: "Random Access Memories",
      artist: "Daft Punk",
      bitrate: "320",
      length: "6:09",
      plays: "83",
      source: "Provider",
      status: "Tags",
      title: "Giorgio by Moroder",
      year: "2013",
    },
    {
      accent: "blue",
      album: "Currents",
      artist: "Tame Impala",
      bitrate: "320",
      length: "7:47",
      plays: "26",
      source: "Local",
      status: "Matched",
      title: "Let It Happen",
      year: "2015",
    },
    {
      accent: "mint",
      album: "Glow On",
      artist: "Turnstile",
      bitrate: "256",
      length: "2:53",
      plays: "9",
      source: "Import",
      status: "New",
      title: "Holiday",
      year: "2021",
    },
  ];

  const audits = [
    { label: "Duplicate files", value: "312", variant: "warning" },
    { label: "Missing artwork", value: "87", variant: "info" },
    { label: "Broken paths", value: "12", variant: "danger" },
  ];

  const pluginQueue = [
    { label: "Bandcamp metadata", state: "Active", value: "14/s" },
    { label: "Acoustic fingerprint", state: "Idle", value: "0/s" },
    { label: "Cover art resolver", state: "Active", value: "6/s" },
  ];
  const waveformBars = [
    16, 27, 38, 49, 26, 37, 48, 25, 36, 47, 24, 35, 46, 23, 34, 45, 22, 33, 44,
    21, 32, 43, 20, 31,
  ];

  let selectedTrackTitle = $state(tracks[0]?.title ?? "");
  let activeSource = $state(sources[0]?.label ?? "");
  let activeView = $state("Tracks");
  let compactRows = $state(true);

  const selectedTrack = $derived(
    tracks.find((track) => track.title === selectedTrackTitle) ?? tracks[0],
  );
</script>

<svelte:head>
  <title>Mantra Music Player</title>
</svelte:head>

<div class="app-frame" data-density={compactRows ? "compact" : "comfortable"}>
  <aside class="sidebar" aria-label="Library navigation">
    <div class="brand-block">
      <div class="brand-mark" aria-hidden="true">
        <AudioLines size={18} strokeWidth={1.8} />
      </div>
      <div>
        <p class="eyebrow">Mantra</p>
        <h1>Library OS</h1>
      </div>
    </div>

    <nav class="source-list" aria-label="Sources">
      {#each sources as source}
        {@const SourceIcon = source.icon}
        <button
          class:active={source.label === activeSource}
          onclick={() => (activeSource = source.label)}
          type="button"
        >
          <span class="source-icon" data-accent={source.accent}>
            <SourceIcon size={16} strokeWidth={1.8} />
          </span>
          <span>{source.label}</span>
          <span class="source-count">{source.count}</span>
        </button>
      {/each}
    </nav>

    <section class="sidebar-section" aria-labelledby="playlist-heading">
      <div class="section-heading">
        <h2 id="playlist-heading">Collections</h2>
        <button aria-label="Create collection" type="button"
          ><Plus size={14} /></button
        >
      </div>
      <div class="playlist-list">
        {#each playlists as playlist}
          <button type="button">
            <span>{playlist.label}</span>
            <span>{playlist.count}</span>
          </button>
        {/each}
      </div>
    </section>

    <section class="storage-card" aria-label="Storage usage">
      <div>
        <Database size={16} strokeWidth={1.8} />
        <span>Archive</span>
      </div>
      <strong>482 GB</strong>
      <div class="meter" aria-hidden="true">
        <span style="width: 68%"></span>
      </div>
      <p>68% indexed, 2 sources pending</p>
    </section>
  </aside>

  <main class="workspace" aria-label="Music library workspace">
    <header class="topbar">
      <div class="search-shell">
        <Search size={17} strokeWidth={1.8} />
        <input
          aria-label="Search music library"
          value="artist:glass tag:focus"
        />
        <kbd>CMD K</kbd>
      </div>

      <div class="topbar-actions">
        <button class="quiet-button" type="button">
          <RotateCw size={15} />
          Sync
        </button>
        <button class="quiet-button" onclick={onToggleTheme} type="button">
          <Settings2 size={15} />
          {nextTheme}
        </button>
        <button class="solid-button" type="button">
          <Download size={15} />
          Import
        </button>
      </div>
    </header>

    <section class="library-header" aria-labelledby="library-title">
      <div>
        <p class="eyebrow">Cross-provider library</p>
        <h2 id="library-title">Tracks requiring attention</h2>
        <p>
          A practical control surface for indexing, tagging, provider matching,
          duplicate review, and everyday playback.
        </p>
      </div>

      <div class="status-grid" aria-label="Library status">
        <div>
          <span>Tracks</span>
          <strong>18,426</strong>
        </div>
        <div>
          <span>Albums</span>
          <strong>1,284</strong>
        </div>
        <div>
          <span>Match rate</span>
          <strong>96.2%</strong>
        </div>
      </div>
    </section>

    <section class="content-grid">
      <div class="library-panel">
        <div class="panel-toolbar">
          <div class="segmented-control" aria-label="Library view">
            {#each ["Tracks", "Albums", "Artists", "Tags"] as view}
              <button
                aria-pressed={activeView === view}
                onclick={() => (activeView = view)}
                type="button"
              >
                {view}
              </button>
            {/each}
          </div>

          <div class="toolbar-tools">
            <button aria-label="Filter tracks" type="button">
              <ListFilter size={15} />
            </button>
            <button aria-label="Library options" type="button">
              <SlidersHorizontal size={15} />
            </button>
            <label class="density-toggle">
              <input bind:checked={compactRows} type="checkbox" />
              Dense
            </label>
          </div>
        </div>

        <div class="track-table" role="table" aria-label="Tracks">
          <div class="table-row table-head" role="row">
            <span role="columnheader">Title</span>
            <span role="columnheader">Album</span>
            <span role="columnheader">Src</span>
            <span role="columnheader">Year</span>
            <span role="columnheader">Bit</span>
            <span role="columnheader">Time</span>
            <span role="columnheader">State</span>
          </div>

          {#each tracks as track}
            <button
              class:active={track.title === selectedTrackTitle}
              class="table-row"
              onclick={() => (selectedTrackTitle = track.title)}
              role="row"
              type="button"
            >
              <span class="track-title-cell" role="cell">
                <span
                  class="cover"
                  data-accent={track.accent}
                  aria-hidden="true"
                >
                  <Disc3 size={18} strokeWidth={1.6} />
                </span>
                <span>
                  <strong>{track.title}</strong>
                  <small>{track.artist}</small>
                </span>
              </span>
              <span role="cell">{track.album}</span>
              <span role="cell">{track.source}</span>
              <span role="cell">{track.year}</span>
              <span role="cell">{track.bitrate}</span>
              <span role="cell">{track.length}</span>
              <span role="cell"
                ><mark data-accent={track.accent}>{track.status}</mark></span
              >
            </button>
          {/each}
        </div>
      </div>

      <aside class="inspector" aria-label="Track inspector">
        <div
          class="inspector-cover"
          data-accent={selectedTrack?.accent ?? "neutral"}
        >
          <Album size={44} strokeWidth={1.4} />
        </div>

        <div class="inspector-title">
          <p class="eyebrow">Selected track</p>
          <h2>{selectedTrack?.title}</h2>
          <p>{selectedTrack?.artist} / {selectedTrack?.album}</p>
        </div>

        <div class="metadata-list">
          <div>
            <span>Provider</span><strong>{selectedTrack?.source}</strong>
          </div>
          <div>
            <span>Bitrate</span><strong>{selectedTrack?.bitrate}</strong>
          </div>
          <div><span>Plays</span><strong>{selectedTrack?.plays}</strong></div>
          <div><span>Status</span><strong>{selectedTrack?.status}</strong></div>
        </div>

        <div class="tag-strip" aria-label="Tags">
          <span><Tags size={13} /> focus</span>
          <span>clean</span>
          <span>library-core</span>
        </div>

        <section class="audit-list" aria-label="Audit summary">
          <h3>Maintenance</h3>
          {#each audits as audit}
            <div data-variant={audit.variant}>
              <span>{audit.label}</span>
              <strong>{audit.value}</strong>
            </div>
          {/each}
        </section>
      </aside>
    </section>
  </main>

  <aside class="right-rail" aria-label="Plugin activity">
    <section class="rail-panel now-playing">
      <div class="rail-heading">
        <h2>Now Playing</h2>
        <Headphones size={15} />
      </div>
      <p>{selectedTrack?.artist}</p>
      <strong>{selectedTrack?.title}</strong>
      <div class="waveform" aria-hidden="true">
        {#each waveformBars as barHeight}
          <span style={`height: ${barHeight}px`}></span>
        {/each}
      </div>
      <div class="transport" aria-label="Playback controls">
        <button aria-label="Shuffle" type="button"><Shuffle size={14} /></button
        >
        <button aria-label="Previous" type="button"
          ><SkipBack size={15} /></button
        >
        <button class="play-button" aria-label="Pause" type="button"
          ><Pause size={16} /></button
        >
        <button aria-label="Next" type="button"
          ><SkipForward size={15} /></button
        >
        <button aria-label="Volume" type="button"><Volume2 size={14} /></button>
      </div>
    </section>

    <section class="rail-panel">
      <div class="rail-heading">
        <h2>Provider Queue</h2>
        <Activity size={15} />
      </div>
      <div class="plugin-list">
        {#each pluginQueue as item}
          <div>
            <span><CircleDot size={10} /> {item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.state}</small>
          </div>
        {/each}
      </div>
    </section>

    <section class="rail-panel timeline">
      <div class="rail-heading">
        <h2>Today</h2>
        <Clock3 size={15} />
      </div>
      <ol>
        <li><span>09:18</span> Indexed local folder</li>
        <li><span>09:24</span> Matched 128 tracks</li>
        <li><span>09:31</span> Found 12 broken paths</li>
      </ol>
    </section>
  </aside>
</div>
