import { PostHog } from "posthog-node";

import { env } from "~/env";

/** Node.js PostHog client for server-side events and feature-flag checks. */
function createPostHogClient() {
  return new PostHog(env.POSTHOG_KEY, {
    host: env.POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
}

export const posthogServerClient = createPostHogClient();
