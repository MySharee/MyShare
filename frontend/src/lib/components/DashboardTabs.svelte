<script lang="ts">
    import { fade } from 'svelte/transition';

    let {
        activeTab = $bindable('notes'),
        searchQuery = $bindable(''),
        myNotesCount = 0,
        publicNotesCount = 0,
    }: {
        activeTab?: 'notes' | 'public' | 'settings';
        searchQuery?: string;
        myNotesCount?: number;
        publicNotesCount?: number;
    } = $props();
</script>

<div class="w-full max-w-6xl flex flex-col items-center gap-6">
    <div class="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="tabs tabs-lifted tabs-lg w-full sm:w-auto">
            <button
                type="button"
                class="tab text-base sm:text-lg font-bold h-14 cursor-pointer transition-all duration-200 active:scale-95 hover:opacity-90 [--tab-bg:var(--color-base-300)] {activeTab ===
                'notes'
                    ? 'tab-active'
                    : 'opacity-70 hover:opacity-100'}"
                onclick={() => (activeTab = 'notes')}
            >
                📝 My Notes
                <span
                    class="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/20 text-white ml-2 transition-transform duration-200 {activeTab === 'notes' ? 'scale-105' : 'scale-95 opacity-80'}"
                    >{myNotesCount}</span
                >
            </button>

            <button
                type="button"
                class="tab text-base sm:text-lg font-bold h-14 cursor-pointer transition-all duration-200 active:scale-95 hover:opacity-90 [--tab-bg:var(--color-base-300)] {activeTab ===
                'public'
                    ? 'tab-active'
                    : 'opacity-70 hover:opacity-100'}"
                onclick={() => (activeTab = 'public')}
            >
                🌐 Instance Notes
                <span
                    class="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/20 text-white ml-2 transition-transform duration-200 {activeTab === 'public' ? 'scale-105' : 'scale-95 opacity-80'}"
                    >{publicNotesCount}</span
                >
            </button>

            <button
                type="button"
                class="tab text-base sm:text-lg font-bold h-14 cursor-pointer transition-all duration-200 active:scale-95 hover:opacity-90 [--tab-bg:var(--color-base-300)] {activeTab ===
                'settings'
                    ? 'tab-active'
                    : 'opacity-70 hover:opacity-100'}"
                onclick={() => (activeTab = 'settings')}
            >
                ⚙️ Settings
            </button>
        </div>

        {#if activeTab !== 'settings'}
            <div class="w-full sm:w-72" transition:fade={{ duration: 150 }}>
                <input
                    type="text"
                    placeholder="Search notes..."
                    bind:value={searchQuery}
                    class="input input-bordered input-sm sm:input-md w-full bg-base-200/60 backdrop-blur-sm transition-all duration-200 focus:scale-[1.02]"
                />
            </div>
        {/if}
    </div>
</div>

