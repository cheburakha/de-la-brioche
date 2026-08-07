export type TimeType = "sec" | "min" | "hour" | "day";

const multipliers: Readonly<Record<TimeType, number>> = {
  sec: 1,
  min: 60,
  hour: 3600,
  day: 86400,
};

export function getErrorMessage(e: unknown): string {
  if (!e) {
    return "Unknown Error";
  }

  if (e instanceof Error) {
    return e.message;
  }

  return e.toString();
}

export function getMilliseconds(value: number, type: TimeType): number {
  return value * multipliers[type] * 1000;
}

export function removeUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => typeof value !== "undefined"),
  ) as T;
}

export function clearObject<T extends object>(obj: T): T | undefined {
  const clearObject = removeUndefined(obj);

  return Object.keys(clearObject).length !== 0 ? clearObject : undefined;
}

export function clearObjectRecursively<T extends object>(obj: T): T {
  const filteredObject = Object.fromEntries(
    Object.entries(obj).filter(([, value]) => typeof value !== "undefined"),
  );

  for (const [key, value] of Object.entries(filteredObject)) {
    if (value && !Array.isArray(value) && typeof value === "object") {
      filteredObject[key] = clearObjectRecursively(value);

      if (Object.keys(filteredObject[key]).length <= 0) {
        delete filteredObject[key];
      }
    }
  }

  return filteredObject as T;
}

export function stripUndefined<T extends object>(object: T): T {
  const entries = Object.entries(object);

  return entries
    .filter(([, value]) => typeof value !== "undefined")
    .reduce(
      (previousValue, [key, value]) => {
        previousValue[key] = value;

        return previousValue;
      },
      {} as Record<string, any>,
    ) as T;
}

export function stripNonBoolean<T = { [token: string]: boolean }>(
  object: object,
): T {
  return Object.entries(object)
    .filter(([, value]) => typeof value === "boolean")
    .reduce(
      (obj, [key, value]) => {
        obj[key] = value;

        return obj;
      },
      {} as Record<string, boolean>,
    ) as T;
}

export function setIntersection<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  const resultIntersection = new Set<T>();

  for (const elem of set2) {
    if (set1.has(elem)) {
      resultIntersection.add(elem);
    }
  }

  return resultIntersection;
}
