import { createRequestHandler } from '@react-router/cloudflare';
import { type ServerBuild } from 'react-router';

import * as build from './build/server';
import { getLoadContext } from './load-context';

const handleRemixRequest = createRequestHandler(build as any as ServerBuild);

export default {
  async fetch(request, env, ctx) {
    try {
      const loadContext = getLoadContext({
        request,
        context: {
          cloudflare: {
            cf: request.cf,
            ctx: {
              props: ctx.props,
              waitUntil: ctx.waitUntil.bind(ctx),
              passThroughOnException: ctx.passThroughOnException.bind(ctx),
            },
            caches,
            env,
          },
        },
      });
      return await handleRemixRequest(request, loadContext);
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
