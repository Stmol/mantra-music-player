<script lang="ts">
  import {
    Activity,
    Album,
    CircleDot,
    Clock3,
    Disc3,
    Download,
    FolderSync,
    HardDrive,
    Headphones,
    ListFilter,
    Pause,
    Plug,
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
  import {
    Button,
    Chip,
    IconButton,
    LibrarySidebar,
    Section,
    Tabs,
    TextField,
    type LibrarySidebarPlaylist,
    type LibrarySidebarSource,
    type LibrarySidebarStorage,
  } from "../../components";
  import type { UiDemoScreenProperties } from "./types";

  let { nextTheme, onToggleTheme }: UiDemoScreenProperties = $props();

  const sources: LibrarySidebarSource[] = [
    { accent: "mint", count: "18.4K", icon: HardDrive, label: "Local Library" },
    { accent: "amber", count: "214", icon: Plug, label: "Providers" },
    { accent: "blue", count: "42", icon: FolderSync, label: "Imports" },
    { accent: "neutral", count: "8", icon: Wand2, label: "Rules" },
  ];

  const playlists: LibrarySidebarPlaylist[] = [
    { count: 128, label: "Inbox Review" },
    { count: 64, label: "Late Night Systems" },
    { count: 219, label: "Production Focus" },
    { count: 38, label: "Unmatched Metadata" },
  ];

  const storage: LibrarySidebarStorage = {
    description: "68% indexed, 2 sources pending",
    label: "Archive",
    progress: 68,
    value: "482 GB",
  };

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

  const libraryViews = [
    { label: "Tracks", value: "Tracks" },
    { label: "Albums", value: "Albums" },
    { label: "Artists", value: "Artists" },
    { label: "Tags", value: "Tags" },
  ];

  const selectedTrack = $derived(
    tracks.find((track) => track.title === selectedTrackTitle) ?? tracks[0],
  );
</script>

<svelte:head>
  <title>Mantra Music Player</title>
</svelte:head>

<div class="app-frame" data-density={compactRows ? "compact" : "comfortable"}>
  <LibrarySidebar
    {activeSource}
    onSourceSelect={(label) => (activeSource = label)}
    {playlists}
    {sources}
    {storage}
  />

  <main class="workspace" aria-label="Music library workspace">
    <header class="topbar">
      <TextField
        appearance="panel-header"
        aria-label="Search music library"
        class="topbar-search"
        value="artist:glass tag:focus"
      >
        {#snippet leading()}
          <Search size={17} strokeWidth={1.8} />
        {/snippet}
        {#snippet trailing()}
          <kbd>CMD K</kbd>
        {/snippet}
      </TextField>

      <div class="topbar-actions">
        <Button type="button" variant="secondary">
          {#snippet children()}
            <RotateCw size={15} />
            Sync
          {/snippet}
        </Button>
        <Button onclick={onToggleTheme} type="button" variant="secondary">
          {#snippet children()}
            <Settings2 size={15} />
            {nextTheme}
          {/snippet}
        </Button>
        <Button type="button" variant="primary">
          {#snippet children()}
            <Download size={15} />
            Import
          {/snippet}
        </Button>
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
          <Tabs
            aria-label="Library view"
            bind:activeValue={activeView}
            items={libraryViews}
          />

          <div class="toolbar-tools">
            <IconButton
              aria-label="Filter tracks"
              type="button"
              variant="control"
            >
              <ListFilter size={15} />
            </IconButton>
            <IconButton
              aria-label="Library options"
              type="button"
              variant="control"
            >
              <SlidersHorizontal size={15} />
            </IconButton>
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
          <Chip type="button">
            <Tags size={13} />
            focus
          </Chip>
          <Chip type="button">clean</Chip>
          <Chip type="button">library-core</Chip>
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
    <Section class="rail-panel now-playing" title="Now Playing" variant="panel">
      {#snippet headerActions()}
        <Headphones size={15} />
      {/snippet}

      <p>{selectedTrack?.artist}</p>
      <strong>{selectedTrack?.title}</strong>
      <div class="waveform" aria-hidden="true">
        {#each waveformBars as barHeight}
          <span style={`height: ${barHeight}px`}></span>
        {/each}
      </div>
      <div class="transport" aria-label="Playback controls">
        <IconButton aria-label="Shuffle" type="button" variant="control">
          <Shuffle size={14} />
        </IconButton>
        <IconButton aria-label="Previous" type="button" variant="control">
          <SkipBack size={15} />
        </IconButton>
        <IconButton aria-label="Pause" type="button" variant="control-primary">
          <Pause size={16} />
        </IconButton>
        <IconButton aria-label="Next" type="button" variant="control">
          <SkipForward size={15} />
        </IconButton>
        <IconButton aria-label="Volume" type="button" variant="control">
          <Volume2 size={14} />
        </IconButton>
      </div>
    </Section>

    <Section class="rail-panel" title="Provider Queue" variant="panel">
      {#snippet headerActions()}
        <Activity size={15} />
      {/snippet}

      <div class="plugin-list">
        {#each pluginQueue as item}
          <div>
            <span><CircleDot size={10} /> {item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.state}</small>
          </div>
        {/each}
      </div>
    </Section>

    <Section class="rail-panel timeline" title="Today" variant="panel">
      {#snippet headerActions()}
        <Clock3 size={15} />
      {/snippet}

      <ol>
        <li><span>09:18</span> Indexed local folder</li>
        <li><span>09:24</span> Matched 128 tracks</li>
        <li><span>09:31</span> Found 12 broken paths</li>
      </ol>
    </Section>
  </aside>
</div>
