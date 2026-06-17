import { accountsTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  const account = (await db.select().from(accountsTable).where(eq(accountsTable.username, (await params).username))).values().toArray()[0];

  if (!account) return new Response(null, { status: 404 });

  let path = "./database/avatars/".concat(account.id, ".avif");
  let exists = existsSync(path);
  if (!exists) path = "./public/default.webp";
  let buffer = (await readFile(path)).buffer;

  const sizeParam = new URLSearchParams(new URL(req.url).search).get("size");
  if (sizeParam) {
    const size = parseInt(sizeParam);
    if (!isNaN(size) && size > 0 && size < 250) {
      buffer = new Uint8Array(
        (
          await sharp(buffer, {
            animated: true,
            pages: -1
          })
            .resize(size, size)
            .toBuffer()
        ).buffer
      ).slice().buffer;
    }
  }

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/avif"
    }
  });
};
