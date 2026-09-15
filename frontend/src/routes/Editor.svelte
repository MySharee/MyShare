<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import type { Note } from '$lib/types';

    let {
        open = $bindable(true),
        onclose,
        oncreated,
    }: {
        open?: boolean;
        onclose?: () => void;
        // eslint-disable-next-line no-unused-vars
        oncreated?: (note: Note) => void;
    } = $props();

    function closeEditor() {
        open = false;
        onclose?.();
    }

    let title = $state('');
    let content = $state('');
    let currentTag = $state('');
    let tags = $state<{ text: string; color?: string }[]>([]);
    let isSubmitting = $state(false);
    let errorMessage = $state('');

    function addTag() {
        const trimmed = currentTag.trim();
        if (trimmed && !tags.some((t) => t.text.toLowerCase() === trimmed.toLowerCase())) {
            tags = [...tags, { text: trimmed, color: '#a6ffda' }];
            currentTag = '';
        }
    }

    function removeTag(index: number) {
        tags = tags.filter((_, i) => i !== index);
    }

    async function postNote() {
        errorMessage = '';

        if (!title.trim()) {
            errorMessage = 'Title is required.';
            return;
        }

        const rawToken = localStorage.getItem('token') || '';
        const token = rawToken.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;
        if (!token) {
            errorMessage = 'You are not signed in.';
            return;
        }

        let userId = localStorage.getItem('userId');
        if (!userId) {
            try {
                const userRes = await fetch('/api/email', {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                    },
                });
                if (userRes.ok) {
                    const userData = await userRes.json();
                    if (userData.userId) {
                        userId = String(userData.userId);
                        localStorage.setItem('userId', userId);
                    }
                }
            } catch {
                // Ignore and proceed
            }
        }

        isSubmitting = true;

        try {
            const res = await fetch('/api/notes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                    'authorization-id': userId || '',
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    tags,
                    visibility: false,
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                errorMessage = data?.message || data?.error || 'Failed to create note.';
                return;
            }

            if (data?.note) {
                oncreated?.(data.note as Note);
            }
            closeEditor();
        } catch (error) {
            console.error('Failed to create note:', error);
            errorMessage = 'Failed to create note. Please try again.';
        } finally {
            isSubmitting = false;
        }
    }
</script>

{#if open}
    <div
        class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        transition:fade={{ duration: 200 }}
        onclick={(e) => {
            if (e.target === e.currentTarget) {
                closeEditor();
            }
        }}
        onkeydown={(e) => {
            if (e.key === 'Escape') {
                closeEditor();
            }
        }}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <div
            class="bg-spooky-black border border-base-content/10 shadow-2xl rounded-2xl w-full max-w-3xl h-[80vh] max-h-[700px] flex flex-col overflow-hidden relative"
            transition:scale={{ duration: 300, start: 0.85, opacity: 0, easing: quintOut }}
        >

            <div class="font-bold text-2xl text-center m-[30px]">Create Note</div>
            <div class="m-[30px] mt-0">
                <div class="font-bold text-left pb-1">Title:</div>
                <input
                    type="text"
                    id="title"
                    placeholder="Write a title..."
                    class="input input-bordered w-full max-w-3xl"
                    maxlength="32"
                    bind:value={title}
                />
                <div class="flex flex-row items-center gap-4 pt-3">
                    <div class="font-bold text-left">Tag:</div>
                    <input
                        type="text"
                        id="tag"
                        placeholder="tag"
                        class="input input-bordered w-[120px] max-w-3xl"
                        bind:value={currentTag}
                        onkeydown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTag();
                            }
                        }}
                    />
                    <button
                        type="button"
                        class="btn btn-circle btn-xs btn-primary shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        aria-label="Add Tag"
                        onclick={addTag}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </div>
                {#if tags.length > 0}
                    <div class="flex flex-wrap gap-2 pt-3">
                        {#each tags as t, index (t.text)}
                            <span class="badge badge-primary gap-1 text-xs py-2 px-3">
                                {t.text}
                                <button
                                    type="button"
                                    class="hover:opacity-75 cursor-pointer ml-1"
                                    onclick={() => removeTag(index)}
                                    aria-label={`Remove tag ${t.text}`}
                                >
                                    ✕
                                </button>
                            </span>
                        {/each}
                    </div>
                {/if}
            </div>
            <div class="m-[30px] mt-0 flex-1 flex flex-col">
                <div class="font-bold text-left pb-2">Content:</div>
                <textarea
                    id="content"
                    placeholder="Write your content..."
                    class="textarea textarea-bordered w-full max-w-3xl flex-1 resize-none"
                    bind:value={content}
                ></textarea>
            </div>

            {#if errorMessage}
                <p class="text-error text-sm text-center px-4 font-semibold">{errorMessage}</p>
            {/if}

            <p class="text-center my-2 text-xs opacity-60">Rest of input items soon</p>
            <div class="flex justify-end gap-3 m-[20px]">
                <button type="button" class="btn btn-ghost cursor-pointer" onclick={closeEditor}>
                    Cancel
                </button>
                <button
                    type="button"
                    onclick={postNote}
                    disabled={isSubmitting || !title.trim()}
                    class="btn btn-primary w-[250px] cursor-pointer"
                >
                    {isSubmitting ? 'Creating...' : 'Create'}
                </button>
            </div>
        </div>
    </div>
{/if}
