import { ref } from "vue";
import { supabase } from "@/lib/supabase";

const userSession = ref(null);

async function handleLogin(credentials) {
  try {
    const {
      error,
      data: { user },
    } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      return {
        user: null,
        error: error.message,
      };
    }
    return { error, user };
  } catch (error) {
    return {
      user: null,
      error: error.error_description || error,
    };
  }
}

async function handleSignup(credentials) {
  try {
    const { email, password } = credentials;
    if (!email || !password) {
      alert("Please provide both your email and password.");
      return;
    }
    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({ email, password });
    if (error) {
      return {
        user: null,
        error: error.message,
      };
    }
    return { error, user };
  } catch (error) {
    return {
      user: null,
      error: error.error_description || error,
    };
  }
}

async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error", error);
      return;
    }
  } catch (err) {
    console.error("Error", err);
  }
}

export { userSession, handleLogin, handleSignup, handleLogout };
