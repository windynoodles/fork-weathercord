import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const accountsTable = sqliteTable("accounts", {
  admin: int(),
  bio: text(),
  displayName: text(),
  email: text().unique(),
  id: text().notNull(),
  joined: int().notNull(),
  password: text().notNull(),
  pronouns: text(),
  username: text().notNull().unique()
});

export const sessionsTable = sqliteTable("sessions", {
  code: text().notNull(),
  date: int().notNull(),
  id: text().notNull(),
  ip: text(),
  userAgent: text()
});
