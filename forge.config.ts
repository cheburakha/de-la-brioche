import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerZIP } from '@electron-forge/maker-zip';
import { VitePlugin } from '@electron-forge/plugin-vite';

const config: ForgeConfig = {
  packagerConfig: {
    name: 'de-la-brioche',
    executableName: 'de-la-brioche',
    asar: true,
    ignoreSystemChecks: true,
    // Only include essential runtime files; ignore everything else
    ignore: /^(?!\/(assets|\.vite|package\.json)(\/|$)).+/s,
  },
  rebuildConfig: {},
  makers: [
    new MakerDMG({}),
    new MakerSquirrel({}),
    new MakerDeb({}),
    new MakerZIP({}),
  ],
  plugins: [
    new VitePlugin({
      build: [
        { entry: 'src/main/index.ts', config: 'vite.main.config.ts' },
        { entry: 'src/preload/index.ts', config: 'vite.preload.config.ts' },
      ],
      renderer: [
        { name: 'main_window', config: 'vite.renderer.config.ts' },
      ],
    }),
  ],
};

export default config;
