"use client";

import { l10n } from "@/lib/l10n.generated";
import { localize } from "./localize";

const DefaultMessage = (props: {
  id: keyof l10n,
  values?: Record<string, string>
}) => {
  let data = localize(props.id);
  for (const key in props.values) {
    data = data.replaceAll(`{{${key}}}`, props.values[key]);
  }
  return (
    <>{data}</>
  );
};

export const defaultMessage = (id: keyof l10n, values?: Record<string, string>) => {
  let data = localize(id);
  for (const key in values) {
    data = data.replaceAll(`{{${key}}}`, values[key]);
  }
  return data;
}

export default DefaultMessage;
