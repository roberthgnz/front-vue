<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { Notify } from "@reliutg/buzz-notify";

import { handleLogin } from "@/composables/useAuth";

import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";

const router = useRouter();

const user = reactive({ email: "", password: "" });

const handleSubmit = async () => {
  const { error } = await handleLogin(user);
  if (error) {
    return Notify({
      type: "danger",
      title: error,
      position: "bottom-center",
    });
  }
  router.push("/");
};
</script>

<template>
  <div class="w-full h-screen grid place-content-center">
    <form class="w-[433.6px]" @submit.prevent="handleSubmit">
      <h1 class="text-center text-4xl font-bold">Welcome back 👋</h1>
      <p class="text-center text-lg mb-8">
        Enter your details to sign in to your account.
      </p>
      <div class="mt-4">
        <VInput
          v-model="user.email"
          type="email"
          label="Email"
          placeholder="Your email"
        />
      </div>
      <div class="mt-4">
        <VInput
          v-model="user.password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
      </div>
      <div class="mt-8">
        <VButton type="submit" variant="black" class="w-full">Log In</VButton>
        <p class="text-center mt-6">
          Don't have an account?
          <router-link to="/sign-up" class="font-bold">Sign Up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
