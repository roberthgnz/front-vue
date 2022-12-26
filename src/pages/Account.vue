<script setup>
import { supabase } from "@/lib/supabase";
import { onMounted, ref, toRefs } from "vue";

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(["session"]);
const { session } = toRefs(props);

const loading = ref(true);
const name = ref("");
const surname = ref("");

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`name, surname`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      name.value = data.name;
      surname.value = data.surname;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const updates = {
      id: user.id,
      name: name.value,
      surname: surname.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="session.user.email" disabled />
    </div>
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="name" type="text" />
    </div>
    <div>
      <label for="surname">surname</label>
      <input id="surname" v-model="surname" type="surname" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" :disabled="loading" @click="signOut">
        Sign Out
      </button>
    </div>
  </form>
</template>
