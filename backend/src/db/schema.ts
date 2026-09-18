import { mysqlTable, int, varchar, text, boolean, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const users = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    bannedAt: timestamp('banned_at'),
});

export const notes = mysqlTable('notes', {
    id: int('id').autoincrement().primaryKey(),
    userId: int('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    body: text('body').notNull(),
    file: varchar('file', { length: 255 }),
    tags: text('tags'),
    visibility: boolean('public').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const tags = mysqlTable('tags', {
    id: int('id').autoincrement().primaryKey(),
    noteId: int('note_id')
        .notNull()
        .references(() => notes.id, { onDelete: 'cascade' }),
    text: varchar('text', { length: 255 }).notNull(),
    color: varchar('color', { length: 7 }),
});

export const usersRelations = relations(users, ({ many }) => ({
    notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one }) => ({
    author: one(users, {
        fields: [notes.userId],
        references: [users.id],
    }),
}));

export const tagRelations = relations(tags, ({ one }) => ({
    note: one(notes, {
        fields: [tags.noteId],
        references: [notes.id],
    }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
