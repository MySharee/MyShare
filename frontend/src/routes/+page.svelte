<script lang="ts">
    import Sidebar from '$lib/components/Sidebar.svelte';
    import TopBar from '$lib/components/TopBar.svelte';
    import DashboardTabs from '$lib/components/DashboardTabs.svelte';
    import CreateNote from '$lib/components/CreateNote.svelte';
    import Card from '$lib/components/Card.svelte';
    import type { Note } from '$lib/types';
    import Editor from './Editor.svelte';
    import { onMount } from 'svelte';

    let myNotes: Note[] = $state([]);
    let publicNotes: Note[] = $state([]);
    let activeTab: 'notes' | 'public' | 'settings' = $state('notes');
    let searchQuery = $state('');
    let isLoading = $state(true);

    async function loadMyNotes() {
        const token = localStorage.getItem('token') || '';
        const userId = localStorage.getItem('userId') || '';
        if (!token) return;

        try {
            const res = await fetch('/api/notes/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                    'authorization-id': userId,
                },
            });
            if (res.ok) {
                const data = await res.json();
                myNotes = data.notes || [];
            }
        } catch (err) {
            console.error('Failed to load user notes:', err);
        }
    }

    async function loadPublicNotes() {
        try {
            const res = await fetch('/api/notes/public');
            if (res.ok) {
                const data = await res.json();
                publicNotes = data.notes || [];
            }
        } catch (err) {
            console.error('Failed to load public notes:', err);
        }
    }

    onMount(async () => {
        isLoading = true;
        await Promise.all([loadMyNotes(), loadPublicNotes()]);
        isLoading = false;
    });

    let displayedNotes = $derived.by(() => {
        const sourceNotes = activeTab === 'notes' ? myNotes : publicNotes;
        const query = searchQuery.trim().toLowerCase();
        if (!query) return sourceNotes;

        return sourceNotes.filter((note) => {
            const titleMatch = note.title?.toLowerCase().includes(query);
            const contentMatch = note.content?.toLowerCase().includes(query);
            const authorMatch = note.author?.toLowerCase().includes(query);
            const tagMatch =
                Array.isArray(note.tags) &&
                note.tags.some((t) => {
                    const tagText = typeof t === 'string' ? t : t.text;
                    return tagText.toLowerCase().includes(query);
                });
            return titleMatch || contentMatch || authorMatch || tagMatch;
        });
    });

    function handleNoteCreated(note: Note) {
        myNotes = [note, ...myNotes];
        if (!note.visibility) {
            publicNotes = [note, ...publicNotes];
        }
    }

    function handleNoteDeleted(id: number) {
        myNotes = myNotes.filter((n) => n.id !== id);
        publicNotes = publicNotes.filter((n) => n.id !== id);
    }

    let editorOpen = $state(false);
    let showSidebar = $state(false);
    function toggleSidebar() {
        showSidebar = !showSidebar;
    }
</script>

<TopBar {toggleSidebar} />
{#if showSidebar}
    <Sidebar {toggleSidebar} />
{/if}
<main class="flex-1 p-6">
    <div class="flex flex-col items-center justify-start w-full py-4">
        <DashboardTabs
            bind:activeTab
            bind:searchQuery
            myNotesCount={myNotes.length}
            publicNotesCount={publicNotes.length}
        />
    </div>

    {#if activeTab === 'settings'}
        <div class="flex flex-col items-center justify-center p-12 text-center">
            <div
                class="card bg-spooky-black border border-base-content/10 shadow-2xl p-8 max-w-md w-full"
            >
                <h2 class="text-2xl font-bold mb-2">⚙️ Settings</h2>
                <p class="text-sm opacity-70">
                    Settings and preferences configuration coming soon.
                </p>
            </div>
        </div>
    {:else}
        {#if isLoading}
            <div class="flex justify-center items-center py-16">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
        {:else if displayedNotes.length > 0}
            <div class="flex flex-wrap gap-4 justify-center mt-4">
                {#each displayedNotes as note (note.id)}
                    <Card {note} ondelete={handleNoteDeleted} />
                {/each}
            </div>
        {:else}
            <div class="text-center py-12 text-base-content/70">
                {#if searchQuery.trim()}
                    <p class="text-lg">No notes found matching "{searchQuery}".</p>
                {:else if activeTab === 'notes'}
                    <p class="text-lg">You don't have any notes yet.</p>
                    <button
                        type="button"
                        class="btn btn-primary btn-sm mt-3 cursor-pointer"
                        onclick={() => (editorOpen = true)}
                    >
                        Create new note
                    </button>
                {:else}
                    <p class="text-lg">No public instance notes found.</p>
                {/if}
            </div>
        {/if}

        <CreateNote onclick={() => (editorOpen = true)} />
    {/if}
</main>
{#if editorOpen}
    <Editor
        bind:open={editorOpen}
        onclose={() => (editorOpen = false)}
        oncreated={handleNoteCreated}
    />
{/if}
