import supabase from "./supabase";

export async function loginApi({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error logging in:", error.message);
    throw new Error(error.message);
  }
  return data;
}
