<script setup>
import { onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import { userSession } from "@/composables/useAuth";

import "@reliutg/buzz-notify/dist/buzz-notify.css";

onMounted(() => {
  userSession.value = JSON.parse(localStorage.getItem("userSession"));

  supabase.auth.getSession().then(({ data }) => {
    userSession.value = data.session;
    localStorage.setItem("userSession", JSON.stringify(userSession.value));
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    userSession.value = _session;
    localStorage.setItem("userSession", JSON.stringify(userSession.value));
  });
});
</script>

<template>
  <router-view></router-view>
  <div data-notify></div>
</template>
