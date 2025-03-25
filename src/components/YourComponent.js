import { useLogin } from "../../features/authentication/useLogin";
// ...existing code...

const { login, isAuthenticating } = useLogin();

const handleLogin = () => {
  login({ email: "user@example.com", password: "password123" });
};

// ...existing code...
<button onClick={handleLogin} disabled={isAuthenticating}>
  Login
</button>;
// ...existing code...
