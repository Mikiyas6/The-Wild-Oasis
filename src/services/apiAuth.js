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

export async function getCurrentUser() {
  // Get the current user from the session from the server
  const { data: session } = await supabase.auth.getSession();
  console.log(session);
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
    throw new Error(error.message);
  }
}
