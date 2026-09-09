import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const feedback = sqliteTable('feedback', {
  id: text('id').primaryKey(),
  gameId: text('game_id').notNull(),
  name: text('name').notNull(),
  body: text('body').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: integer('created_at').notNull(),
  visitorHash: text('visitor_hash').notNull(),
}, table => [index('idx_feedback_visitor_created').on(table.visitorHash, table.createdAt)]);
