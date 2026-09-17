import { eq } from 'drizzle-orm';
import { db, notes, tags, type Note, type NewNote } from '../index';

export async function findNoteById(id: number): Promise<Note | undefined> {
    const result = await db.select().from(notes).where(eq(notes.id, id)).limit(1);
    return result[0];
}

export async function findUserNotes(userId: number): Promise<Note[]> {
    return await db.select().from(notes).where(eq(notes.userId, userId));
}

export async function createNoteWithTags(noteData: NewNote, tagList: string[]): Promise<Note> {
    return await db.transaction(async (tx) => {
        const [inserted] = await tx.insert(notes).values(noteData).$returningId();
        if (tagList.length > 0) {
            await tx.insert(tags).values(tagList.map((text) => ({ noteId: inserted.id, text })));
        }
        const [created] = await tx.select().from(notes).where(eq(notes.id, inserted.id));
        return created;
    });
}
