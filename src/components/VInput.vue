<script setup>
defineProps({
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  invalid: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <label v-if="label" class="block text-lg mb-2">{{ label }}</label>
  <input
    :type="type"
    :value="modelValue"
    v-bind="$attrs"
    class="w-full border border-[#D4D4D4] rounded-xl p-4"
    :class="{ 'border-red-500': invalid, 'text-red-500': invalid }"
    @change="$emit('update:modelValue', $event.target.value)"
  />
</template>
