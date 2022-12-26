<script setup>
defineProps(["id", "name", "slug", "symbol", "price", "percentChange1h"]);
</script>

<template>
  <div class="border border-black rounded-lg px-4 py-2 select-none">
    <div class="flex justify-between">
      <div class="flex">
        <img
          :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`"
          width="32"
          height="32"
        />
        <span class="text-2xl font-bold ml-2">{{ name }}</span>
      </div>
      <span class="block bg-gray-100 py-1 px-2 rounded">{{ symbol }}</span>
    </div>
    <span class="block text-lg font-bold my-2"
      >${{ Number(price).toFixed(2) }}</span
    >
    <span
      class="flex items-center"
      :class="[percentChange1h > 0 ? 'text-green-500' : 'text-red-500']"
    >
      <svg
        v-if="percentChange1h > 0"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711C16.3166 8.09763 15.6834 8.09763 15.2929 7.70711L13 5.41421V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V5.41421L8.70711 7.70711C8.31658 8.09763 7.68342 8.09763 7.29289 7.70711C6.90237 7.31658 6.90237 6.68342 7.29289 6.29289L11.2929 2.29289Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 2C12.5523 2 13 2.44772 13 3L13 18.5858L15.2929 16.2929C15.6834 15.9024 16.3166 15.9024 16.7071 16.2929C17.0976 16.6834 17.0976 17.3166 16.7071 17.7071L12.7071 21.7071C12.5196 21.8946 12.2652 22 12 22C11.7348 22 11.4804 21.8946 11.2929 21.7071L7.29289 17.7071C6.90237 17.3166 6.90237 16.6834 7.29289 16.2929C7.68342 15.9024 8.31658 15.9024 8.70711 16.2929L11 18.5858L11 3C11 2.44772 11.4477 2 12 2Z"
          fill="currentColor"
        />
      </svg>
      <span class="ml-1">{{ Number(percentChange1h).toFixed(2) }}%</span></span
    >
  </div>
</template>
