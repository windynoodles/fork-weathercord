import { cwd } from "node:process";
import data from "../../public/l10n/en-us.json" with { type: "json" };
import { join } from "node:path";
import { writeFileSync } from "node:fs";

let buffer = "export type l10n = {\n";
for (const key of Object.keys(data)) {
  console.log(key);
  buffer += `  "${key}": string,\n`;
}
// no trailing commas in MY weathercord
buffer = buffer.replace(/,\n$/, "\n") + "};\n";

writeFileSync(join(cwd(), "src", "lib", "l10n.generated.ts"), buffer);
