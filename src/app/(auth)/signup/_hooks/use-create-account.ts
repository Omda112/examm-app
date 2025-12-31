import { RegisterValues } from "@/lib/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import { createAccountAction } from "../_actions/create-account-action";


export function useCreateAccount() {
  return useMutation({
    mutationFn: async (values: RegisterValues) => {
      const res = await createAccountAction(values);
      console.log(res);
      return res;
    },
  });
}
