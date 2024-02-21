export function generateKey(key: string): { m: number; b: number } {
  return {
    m: extractParam("m", key) || 1,
    b: extractParam("b", key) || 0,
  };
}

function extractParam(parameter: string, key: string): number | null {
  const regex = new RegExp(`${parameter}=(\\d+)`);
  const match = key.match(regex);
  if (match) {
    return parseInt(match[1].trim());
  }

  return null;
}
