import { useAuthContext } from "../context/AuthContext";

// Custom authentication hook.
export default function useAuth() {
  return useAuthContext();
}
