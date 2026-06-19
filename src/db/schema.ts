import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const boolean = () => int({ mode: "boolean" });

export interface Account {
  accent1: string | null;
  accent2: string | null;
  avatar: string;
  admin: boolean;
  banner: string;
  bio: string | null;
  connections: Connection[];
  displayName: string | null;
  email: string;
  id: string;
  joined: number;
  lang: string;
  nameFont: string | null;
  password: string;
  pronouns: string | null;
  username: string;
}

export enum ConnectionType {
  Domain = "domain"
}

export interface Connection {
  id: string;
  type: ConnectionType;
  value: string;
}

export type PublicAccount = Omit<Required<Account>, "email" | "password">;
export type AuthorizedAccountFromAPI = Required<Omit<Account, "password">>;

export const accountsTable = sqliteTable("accounts", {
  accent1: text(),
  accent2: text(),
  admin: boolean(),
  bio: text(),
  displayName: text(),
  email: text().notNull(),
  id: text().notNull().unique(),
  joined: int().notNull(),
  lang: text().notNull().default("en-us"),
  nameFont: text(),
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

export const connectionsTable = sqliteTable("connections", {
  id: text().notNull(),
  type: text().notNull(),
  value: text().notNull()
});
