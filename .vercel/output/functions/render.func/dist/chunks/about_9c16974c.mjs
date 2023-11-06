export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/about_f0f7b983.mjs').then(n => n.b);

export { page };
