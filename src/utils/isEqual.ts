function isEqual(a: object, b: object): boolean {
  if (a === b) {
    return true;
  }

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valueA = (a as any)[key];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valueB = (b as any)[key];
    if (!isEqual(valueA, valueB)) {
      return false;
    }
  }
  return true;
}

export default isEqual;
