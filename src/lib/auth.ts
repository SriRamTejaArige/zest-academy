import { supabase } from "./supabase";

export type UserRole = "student" | "teacher" | "admin";

export type AuthResult = { ok: true } | { ok: false; error: string };

/**
 * Sign up a new user with email/password.
 * Their profile row is created automatically by the database trigger.
 * The role and full_name come from raw_user_meta_data.
 */
export async function signUp(params: {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}): Promise<AuthResult> {
  // Hard guard: never allow admin sign-up via the public form.
  if (params.role === "admin") {
    return { ok: false, error: "Admin accounts must be created manually." };
  }

  const { error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: {
        full_name: params.fullName,
        role: params.role,
      },
    },
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Sign in with email + password. */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Sign out the current user. */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}