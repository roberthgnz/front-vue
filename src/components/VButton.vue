<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "default",
  },
});

const buttonClassStyle = {
  "bg-black": props.variant === "black",
  "text-white": props.variant === "black",
  "border-black": props.variant === "black",
};
</script>
<template>
  <button
    :type="type"
    class="text-lg py-4 px-6 border border-[#D4D4D4] rounded-xl"
    :class="{
      ...buttonClassStyle,
      'bg-[#D4D4D4]': $attrs.disabled,
      'disabled:opacity-50': $attrs.disabled,
      'cursor-not-allowed': $attrs.disabled,
    }"
  >
    <slot />
  </button>
</template>
