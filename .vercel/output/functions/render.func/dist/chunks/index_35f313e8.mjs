export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/index_1a037182.mjs').then(n => n.i);

export { page };
