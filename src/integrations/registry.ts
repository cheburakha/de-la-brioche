import type { JobSource } from './types';
import { HHRuSource } from './hhru/index.js';
import { SuperJobSource } from './superjob/index.js';
import { GreenhouseSource } from './greenhouse/index.js';

const builtIn: JobSource[] = [
  new HHRuSource(),
  new SuperJobSource(),
  new GreenhouseSource(),
];

export class SourceRegistry {
  private sources = new Map<string, JobSource>();

  constructor() {
    for (const s of builtIn) {
      this.sources.set(s.meta.id, s);
    }
  }

  all(): JobSource[] {
    return [...this.sources.values()];
  }

  get(id: string): JobSource | undefined {
    return this.sources.get(id);
  }

  enabled(): JobSource[] {
    return this.all();
  }
}
