'use server';

import { ResetPasswordValues } from '@/lib/schemas/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import callApi from '../../services/auth';

// Server action to handle password reset
export async function resetPasswordAction(values: ResetPasswordValues) {
  // Get stored cookies
  const cookieStore = cookies();
  const email = cookieStore.get('reset_email')?.value || '';

  // Check if reset email exists
  if (!email) return { ok: false, message: 'Reset email not found. Please start again.' };

  const { newPassword, rePassword } = values;

  // Validate new password
  if (!newPassword) return { ok: false, message: 'New password is required.' };
  if (newPassword !== rePassword) return { ok: false, message: 'Passwords do not match.' };

  // Call API to reset password
  const res = await callApi('/auth/resetPassword', 'PUT', { email, newPassword });

  // If successful, clear cookies and redirect to login
  if (res.ok) {
    cookieStore.delete('reset_email');
    cookieStore.delete('reset_verified');
    redirect('/login');
  }

  // Return API response
  return res;
}
