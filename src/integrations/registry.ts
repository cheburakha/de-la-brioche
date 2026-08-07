import type { JobSource } from "./types";
import { HHRuSource } from "./hhru/index";
import { GreenhouseSource } from "./greenhouse/index";
import { RemoteOkSource } from "./remoteok/index";
import { RemotiveSource } from "./remotive/index";
import { AdzunaSource } from "./adzuna/index";
import { JoobleSource } from "./jooble/index";

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
