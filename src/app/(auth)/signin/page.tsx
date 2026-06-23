'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setDemoAuth } from '@/lib/demo-mode';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('请输入邮箱地址');
      return;
    }

    setLoading(true);

    // 演示模式：直接登录
    setTimeout(() => {
      const name = email.split('@')[0] || '用户';
      setDemoAuth(email, name);
      setSent(true);
      setLoading(false);

      // 自动跳转到首页
      setTimeout(() => {
        router.push('/home');
      }, 1500);
    }, 800);
  }

  return (
    <div className="flex flex-col min-h-screen px-6 justify-center" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-sm w-full mx-auto">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/10">
            <span className="text-4xl">🍽️</span>
          </div>
          <h1 className="text-hero text-gradient">食忆</h1>
          <p className="text-ink-secondary mt-2 text-body">AI 驱动的饮食日记</p>
        </div>

        {sent ? (
          /* 成功状态 */
          <div className="text-center animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-green-light flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-title text-ink mb-2">欢迎回来！</h2>
            <p className="text-ink-secondary text-body leading-relaxed">
              正在跳转到首页...
            </p>
          </div>
        ) : (
          /* 登录表单 */
          <>
            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-caption font-medium text-ink-secondary mb-2">
                  邮箱地址
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus
                  className="w-full px-4 py-3.5 bg-surface-secondary border border-surface-tertiary rounded-card-sm
                             text-body text-ink placeholder:text-ink-tertiary
                             focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                             transition-all"
                />
              </div>

              {error && (
                <p className="text-accent-red text-caption animate-slide-up">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-accent text-white rounded-card-sm font-semibold text-body
                           shadow-lg shadow-accent/25 active:scale-[0.98] transition-transform
                           disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
                  </svg>
                )}
                {loading ? '登录中...' : '登录'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-tertiary" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-surface text-caption text-ink-tertiary">演示模式</span>
              </div>
            </div>

            <p className="text-center text-caption text-ink-secondary">
              还没有账号？{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-accent font-medium hover:underline"
              >
                注册
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
