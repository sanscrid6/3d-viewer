import { Raw } from 'typeorm';

let uid = 0n;
export function RegexMatches(regex: string) {
  const paramId = `regex${uid.toString(16)}`;
  uid += 1n;

  return Raw((pathAlias: string) => `${pathAlias} ~ :${paramId}`, {
    [paramId]: regex,
  });
}
