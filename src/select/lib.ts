import type { DefaultOption } from "./types";

export function search(text: string, search: string): boolean {
  return text.trim().toLowerCase().includes(search.toLowerCase());
}

export function createOption(
  label: string,
  value?: string
): DefaultOption {
  return {
    label,
    value: value ?? label.trim().toLowerCase(),
  }
}
