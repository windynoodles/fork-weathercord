import { cwd } from "node:process";
import data from "../../public/l10n/en-us.json" with { type: "json" };
import { join } from "node:path";
import { writeFileSync } from "node:fs";

let buffer = "export type l10nValue =\n";
for (const key of Object.keys(data)) {
  console.log(key);
  buffer += `  | "${key}"\n`;
}
buffer = buffer.replace(/\n$/, ";\n");
buffer += "\nexport type l10n = Record<l10nValue, string>;\n";

writeFileSync(join(cwd(), "src", "lib", "l10n.generated.ts"), buffer);
