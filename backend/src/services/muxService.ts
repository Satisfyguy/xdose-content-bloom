import { Mux } from '@mux/mux-node';

declare global {
  // eslint-disable-next-line no-var
  var mux: Mux | undefined;
}

const mux =
  globalThis.mux ||
  new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
  });
if (process.env.NODE_ENV !== 'production') globalThis.mux = mux;

export const createDirectUpload = async () => {
  return await mux.video.uploads.create({
    new_asset_settings: { playback_policy: 'public' },
    cors_origin: '*', // À restreindre en prod
  });
}; 