import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading: isAuthenticating } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Login successful");
      navigate("/", { replace: true });
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isAuthenticating };
}
