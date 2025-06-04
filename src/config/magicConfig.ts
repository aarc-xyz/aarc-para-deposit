import { Magic } from 'magic-sdk';

// Replace with your actual publishable API key
const MAGIC_API_KEY = import.meta.env.VITE_MAGIC_PUBLISHABLE_API_KEY;

// Magic SDK configuration
export const magicConfig = {
  apiKey: MAGIC_API_KEY,
  network: {
    rpcUrl: 'https://rpc.sepolia.org',
    chainId: 11155111
  },
  testMode: true,
  deferPreload: true,
};

// Initialize Magic instance
export const magic = new Magic(magicConfig.apiKey, {
  network: magicConfig.network,
  testMode: magicConfig.testMode,
  deferPreload: magicConfig.deferPreload,
});

magic.preload().then(() => console.log('Magic <iframe> loaded.'));