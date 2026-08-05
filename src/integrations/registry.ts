import type { JobSource } from "./types";
import { HHRuSource } from "./hhru/index.js";
import { GreenhouseSource } from "./greenhouse/index.js";
import { RemoteOkSource } from "./remoteok/index.js";
import { RemotiveSource } from "./remotive/index.js";
import { AdzunaSource } from "./adzuna/index.js";
import { JoobleSource } from "./jooble/index.js";

const builtIn: JobSource[] = [
  new HHRuSource(),
  new GreenhouseSource(),
  new RemoteOkSource(),
  new RemotiveSource(),
  new AdzunaSource(),
  new JoobleSource(),
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
