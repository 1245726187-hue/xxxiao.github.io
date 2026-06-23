'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setDemoAuth } from '@/lib/demo-mode';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('请输入您的姓名');
      return;
    }
    if (!email.trim()) {
      setError('请输入邮箱地址');
      return;
    }

    setLoading(true);

    // 演示模式：直接注册并登录
    setTimeout(() => {
      setDemoAuth(email, name.trim());
      setLoading(false);
      router.push('/home');
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
          <p className="text-ink-secondary mt-2 text-body">开启您的饮食之旅</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-caption font-medium text-ink-secondary mb-2">
              您的姓名
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="张三"
              autoComplete="name"
              autoFocus
              className="w-full px-4 py-3.5 bg-surface-secondary border border-surface-tertiary rounded-card-sm
                         text-body text-ink placeholder:text-ink-tertiary
                         focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                         transition-all"
            />
          </div>

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
            className="w-full py-4 bg-accent text-white rounded-card-sm font-semibold text-body mt-2
                       shadow-lg shadow-accent/25 active:scale-[0.98] transition-transform
                       disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
              </svg>
            )}
            {loading ? '创建中...' : '创建账户'}
          </button>
        </form>

        <p className="text-center mt-8 text-caption text-ink-secondary">
          已有账号？{' '}
          <button
            onClick={() => router.push('/signin')}
            className="text-accent font-medium hover:underline"
          >
            登录
          </button>
        </p>
      </div>
    </div>
  );
}
