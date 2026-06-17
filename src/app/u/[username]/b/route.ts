import { accountsTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  const account = (await db.select().from(accountsTable).where(eq(accountsTable.username, (await params).username))).values().toArray()[0];

  if (!account) return new Response(null, { status: 404 });

  let path = "./database/banners/".concat(account.id, ".avif");
  let exists = existsSync(path);
  if (!exists) return new Response(null, { status: 204 });
  let buffer = (await readFile(path)).buffer;

  const sizeParam = new URLSearchParams(new URL(req.url).search).get("size");
  if (sizeParam) {
    const size = parseInt(sizeParam);
    if (!isNaN(size) && size > 0 && size < 450) {
      buffer = new Uint8Array(
        (
          await sharp(buffer, {
            animated: true,
            pages: -1
          })
            .resize(size, Math.round(size / 3))
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
