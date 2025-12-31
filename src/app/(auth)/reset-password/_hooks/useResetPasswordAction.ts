
'use client';

import { ResetPasswordValues } from '@/lib/schemas/auth';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordAction } from '../_actions/reset-pass.action';


export function useResetPasswordAction() {
  return useMutation({
    mutationFn: async (values: ResetPasswordValues) => {
      return await resetPasswordAction(values);
    },
  });
}
