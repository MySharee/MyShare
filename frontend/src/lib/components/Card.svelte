<script lang="ts">
    import type { Note } from '$lib/types';

    let {
        note,
        ondelete,
    }: {
        note: Note;
        // eslint-disable-next-line no-unused-vars
        ondelete?: (id: number) => void;
    } = $props();

    let menuOpen = $state(false);

    async function handleDelete() {
        menuOpen = false;

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token) return;

        try {
            const res = await fetch('/api/notes/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
                body: JSON.stringify({
                    noteId: note.id,
                    userId: userId || '',
                }),
            });
            if (res.ok) {
                if (ondelete) {
                    ondelete(note.id);
                } else {
                    window.location.reload();
                }
            } else {
                const data = await res.json().catch(() => null);
                alert(data?.message || 'Failed to delete note.');
            }
        } catch (err) {
            console.error('Failed to delete note:', err);
        }
    }
</script>

<div class="w-[400px]">
    <div
        class="card bg-spooky-black backdrop-blur-2xl border border-space-gray/50 shadow-2xl w-full max-w-3xl rounded-lg relative z-10"
    >
        <div class="card-body p-6 sm:p-4 flex flex-col gap-3">
            <div class="flex items-start justify-between gap-2">
                <div class="flex flex-col flex-1 min-w-0">
                    <h2 class="text-2xl font-bold break-words">{note.title}</h2>
                    {#if note.author}
                        <span class="text-xs text-base-content/60 mt-0.5">
                            by <span class="font-medium text-primary">{note.author}</span>
                        </span>
                    {/if}
                </div>
                <div class="relative shrink-0">
                    <button
                        type="button"
                        class="btn btn-ghost btn-circle btn-sm flex items-center justify-center text-space-gray hover:text-white transition-colors cursor-pointer"
                        aria-label="Note options"
                        onclick={() => (menuOpen = !menuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>
                    </button>

                    {#if menuOpen}
                        <button
                            type="button"
                            class="fixed inset-0 z-20 cursor-default bg-transparent"
                            onclick={() => (menuOpen = false)}
                            tabindex="-1"
                            aria-label="Close menu"
                        ></button>

                        <div
                            class="absolute right-0 top-full mt-1 w-32 bg-light-black/95 backdrop-blur-xl border border-space-gray/30 rounded-lg shadow-2xl py-1 z-30 flex flex-col"
                        >
                            <button
                                type="button"
                                class="px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                                onclick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    {/if}
                </div>
            </div>
            <p class="multiline">{note.content}</p>

            {#if Array.isArray(note.tags) && note.tags.length > 0}
                <div class="flex flex-wrap gap-1.5 pt-2 border-t border-base-content/5">
                    {#each note.tags as tag}
                        <span class="badge badge-sm opacity-75">
                            {typeof tag === 'string' ? tag : '#' + tag.text}
                        </span>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>
