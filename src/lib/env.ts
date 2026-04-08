import { z } from 'zod';

const envShape = {
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  FLUTTERWAVE_PUBLIC_KEY: z.string().min(1),
  FLUTTERWAVE_SECRET_KEY: z.string().min(1),
  FLUTTERWAVE_WEBHOOK_SECRET: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  SENTRY_DSN: z.string().optional(),
} as const;

type EnvKey = keyof typeof envShape;
type Env = {
  [K in EnvKey]: z.infer<(typeof envShape)[K]>;
};

const envCache: Partial<Env> = {};

function readEnv<K extends EnvKey>(key: K): Env[K] {
  if (key in envCache) {
    return envCache[key] as Env[K];
  }

  const value = envShape[key].parse(process.env[key]) as Env[K];
  envCache[key] = value;
  return value;
}

export const env = new Proxy({} as Env, {
  get(_target, prop) {
    if (typeof prop !== 'string' || !(prop in envShape)) {
      return undefined;
    }

    return readEnv(prop as EnvKey);
  },
  has(_target, prop) {
    return typeof prop === 'string' && prop in envShape;
  },
  ownKeys() {
    return Object.keys(envShape);
  },
  getOwnPropertyDescriptor(_target, prop) {
    if (typeof prop !== 'string' || !(prop in envShape)) {
      return undefined;
    }

    return {
      enumerable: true,
      configurable: true,
    };
  },
});

export function getEnv<K extends EnvKey>(key: K): Env[K] {
  return readEnv(key);
}
