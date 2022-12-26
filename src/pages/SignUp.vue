<script setup>
import { reactive } from "vue";
import { Notify } from "@reliutg/buzz-notify";

import { supabase } from "@/lib/supabase";
import { handleSignup } from "@/composables/useAuth";

import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";

const USER_STATE = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirm: "",
};

const user = reactive(USER_STATE);

const handleSubmit = async () => {
  const { error, user: data } = await handleSignup(user);

  if (error) {
    return Notify({
      type: "danger",
      title: error,
      position: "bottom-center",
    });
  }

  Notify({
    type: "success",
    title: "¡Registro completo!",
    html: "Confirma tu correo electrónico",
    position: "bottom-center",
  });

  const updates = {
    id: data.id,
    name: user.name,
    surname: user.surname,
    updated_at: new Date(),
  };

  await supabase.from("profiles").upsert(updates);

  user.name = "";
  user.surname = "";
  user.email = "";
  user.password = "";
  user.confirm = "";
};
</script>

<template>
  <div class="w-full h-screen grid place-content-center">
    <form @submit.prevent="handleSubmit">
      <h1 class="text-center text-4xl font-bold">Welcome 👋</h1>
      <p class="text-center text-lg mb-8">
        Enter your details to create an account.
      </p>
      <div class="grid grid-cols-2 gap-5">
        <div>
          <VInput
            v-model="user.name"
            label="Name"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <VInput
            v-model="user.surname"
            label="Last Name"
            placeholder="Your last name"
            required
          />
        </div>
      </div>
      <div class="mt-4">
        <VInput
          v-model="user.email"
          type="email"
          label="Email"
          placeholder="Your email"
          required
        />
      </div>
      <div class="mt-4">
        <VInput
          v-model="user.password"
          type="password"
          label="Password"
          placeholder="Create a password"
          required
        />
      </div>
      <div class="mt-4">
        <VInput
          v-model="user.confirm"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          :invalid="user.password !== user.confirm"
          required
        />
      </div>
      <div class="mt-8">
        <VButton
          type="submit"
          variant="black"
          class="w-full"
          :disabled="user.password !== user.confirm"
          >Create Account</VButton
        >
        <p class="text-center mt-6">
          Already have an account?
          <router-link to="/sign-in" class="font-bold">Log In</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
