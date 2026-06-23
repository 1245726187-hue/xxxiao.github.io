import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

// Use empty placeholders in demo mode — the client won't throw,
// but API calls will fail gracefully instead of crashing.
function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes('your-project-id')) {
    console.warn(
      '⚠ Food Memory 运行在演示模式。请配置 .env.local 中的 Supabase 凭据以启用完整功能。'
    );
    return {
      url: 'http://localhost:54321',
      key: 'demo-mode-no-backend',
    };
  }

  return { url, key };
}

export function createClient() {
  if (client) return client;

  const { url, key } = getSupabaseConfig();
  client = createBrowserClient<Database>(url, key);
  return client;
}
