import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((s) => s.setUsername);
  const defaultValues = useMemo<LoginFormValues>(() => ({ username: '', password: '' }), []);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (_ok, variables) => {
      setUsername(variables.username);
      navigate('/home');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(values);
    } catch {
      // React Query stores the error; UI renders it via loginMutation.isError.
    }
  };

  return (
    <div className='app'>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ color: 'var(--text-muted)' }}>Username</span>
          <input
            {...register('username')}
            autoComplete='username'
            placeholder='Enter username'
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
            }}
          />
          {errors.username && (
            <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.username.message}</span>
          )}
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ color: 'var(--text-muted)' }}>Password</span>
          <input
            {...register('password')}
            type='password'
            autoComplete='current-password'
            placeholder='Enter password'
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
            }}
          />
          {errors.password && (
            <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.password.message}</span>
          )}
        </label>

        {loginMutation.isError ? (
          <div style={{ color: '#dc2626', fontSize: 12 }}>
            {(loginMutation.error as any)?.response?.data?.message ??
              (loginMutation.error as Error).message}
          </div>
        ) : null}

        <button
          className='counter'
          type='submit'
          disabled={isSubmitting || loginMutation.isPending}
          style={{ opacity: isSubmitting || loginMutation.isPending ? 0.7 : 1 }}
        >
          {isSubmitting || loginMutation.isPending ? 'Signing in…' : 'Sign in'}
        </button>

        <div style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link to='/register' style={{ color: 'inherit' }}>
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
}
