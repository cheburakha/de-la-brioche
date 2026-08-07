export class ArrayHelpers {
  public static values<T extends object, K extends keyof T>(
    items: T[],
    key: K,
  ): T[K][] {
    return items.map((item) => {
      if (!(key in item)) {
        throw new Error("received array of incorrect items");
      }

      return item[key];
    });
  }

  public static cast<T = unknown>(value: T | Array<T>): Array<T> {
    return Array.isArray(value) ? value : [value];
  }

  public static duplicates<T = unknown>(arr: Array<T>): Array<T> {
    return [...new Set(arr.filter((e, i, a) => a.indexOf(e) !== i))];
  }

  public static isValid<T extends Array<unknown>>(arr?: T | null): boolean {
    return Array.isArray(arr) && arr.length > 0;
  }

  public static unique<T extends number | string>(arr: Array<T>): Array<T> {
    return [...new Set(arr)];
  }

  public static intersects<T>(...arrays: (T[] | null | undefined)[]): boolean {
    const validArrays = arrays.filter((arr) => ArrayHelpers.isValid(arr));

    if (validArrays.length < 2) {
      return false;
    }

    for (let i = 0; i < validArrays.length; i++) {
      for (let j = i + 1; j < validArrays.length; j++) {
        const set = new Set(validArrays[i]);
        if ((validArrays[j] as T[]).some((item) => set.has(item))) {
          return true;
        }
      }
    }

    return false;
  }
}
