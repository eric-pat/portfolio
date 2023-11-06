import { defineConfig } from 'astro/config';
import imageEndpoint from 'astro-https-image-endpoint';

export default defineConfig({
    site: 'https://eric-pat.github.io',
    base: '/portfolio',
    image: {
        // Pass "import.meta.env.DEV" to ensure it is only enabled on development.
        endpoint: imageEndpoint(import.meta.env.DEV),
    },
});


