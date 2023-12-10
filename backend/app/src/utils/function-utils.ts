export function toSlug(name: string) {
  return (
    name
      .toLowerCase()
      .trim()
      // .replace(/[^\w\s-]/g, '') replaces unicode
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  );
}
