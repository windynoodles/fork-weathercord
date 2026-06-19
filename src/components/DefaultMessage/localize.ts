import type { l10n } from "@/lib/l10n.generated";

let localized: l10n;

export const setl10nData = async (code: string) => localized = (await (await fetch(`/l10n/${code}.json`)).json()) as l10n;

export const localize = (item: keyof l10n) => localized?.[item] ?? item;
