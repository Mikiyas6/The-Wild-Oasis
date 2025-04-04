import supabase, { supabaseUrl } from "./supabase";

export async function signupApi({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName },
      avatar: "",
    },
  });
  if (error) {
    console.error("Error signing up:", error.message);
    throw new Error(error.message);
  }
  return data;
}

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

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload the Avatar Image

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(error.message);
  }

  // 3. Update Avatar in the User

  const { data: updatedUser, error: userError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (userError) {
    throw new Error(userError.message);
  }
  return updatedUser;
}
