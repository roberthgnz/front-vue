<script setup>
import { ref, reactive, onMounted, watchEffect } from "vue";
import { Notify } from "@reliutg/buzz-notify";

import { supabase } from "@/lib/supabase";
import { userSession } from "@/composables/useAuth";

import VNavbar from "@/components/VNavbar.vue";
import VButton from "@/components/VButton.vue";
import CryptoCard from "@/components/CryptoCard.vue";
import VModal from "@/components/VModal.vue";
import VInput from "@/components/VInput.vue";
import VSelect from "@/components/VSelect.vue";
import VOption from "@/components/VOption.vue";

const coins = ref([]);
const isModalOpen = ref(false);
const form = ref(null);
const transaction = reactive({
  type: "",
  cryptocurrencyId: "",
  amount: "",
  price: "",
});

const transactions = ref([]);

const getCoinById = (id) => coins.value.find((coin) => coin.id === id);

const fomatDate = (date) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat(navigator.language || navigator.userLanguage, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat(navigator.language || navigator.userLanguage, {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const fetchTransactions = async () => {
  const { data: portfolio } = await supabase
    .from("portfolio")
    .select("*")
    .eq("user", userSession.value.user.id);
  transactions.value = portfolio;
};

const handleTransaction = async () => {
  if (!form.value.checkValidity()) {
    return form.value.reportValidity();
  }
  const { error } = await supabase
    .from("portfolio")
    .insert([{ ...transaction, user: userSession.value.user.id }]);
  if (error) {
    return Notify({
      type: "danger",
      title: error.message,
      position: "bottom-center",
    });
  }
  // Update the transactions
  transaction.type = "";
  transaction.cryptocurrencyId = "";
  transaction.amount = "";
  transaction.price = "";
  isModalOpen.value = false;
  await fetchTransactions();
};

const options = reactive({
  chart: {
    type: "bar",
  },
  title: {
    text: "Allocation",
  },
});

const series = reactive([
  {
    name: "Holdings",
    data: [],
  },
]);

const treemapOptions = reactive({
  chart: {
    type: "treemap",
  },
  title: {
    text: "Distribution",
  },
});

const treemapSeries = reactive([
  {
    name: "Cryptocurrencies",
    data: [],
  },
]);

const lineOptions = reactive({
  chart: {
    type: "line",
  },
  title: {
    text: "Holdings",
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
});

const lineSeries = reactive([
  {
    name: "Holdings",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 120, 150, 200],
  },
]);

onMounted(async () => {
  const response = await fetch("/api/cryptocurrency/listings");
  const { data } = await response.json();
  coins.value = data;
  await fetchTransactions();
});

watchEffect(async () => {
  const mapped = transactions.value.map((transaction) => {
    const coin = coins.value.find(
      (coin) => coin.id === transaction.cryptocurrencyId
    );
    return {
      x: coin.name,
      y: transaction.amount,
    };
  });

  series[0].data = mapped.reduce((acc, curr) => {
    const index = acc.findIndex((item) => item.x === curr.x);
    if (index === -1) {
      acc.push(curr);
    } else {
      acc[index].y += curr.y;
    }
    return acc;
  }, []);

  lineSeries[0].data = transactions.value.reduce((acc, curr) => {
    const date = new Date(curr.created_at);
    const month = date.getMonth();
    if (acc[month]) {
      acc[month] += curr.type === "buy" ? curr.amount : -curr.amount;
    } else {
      acc[month] = curr.amount;
    }
    return acc;
  }, Array(12).fill(0));

  treemapSeries[0].data = mapped.reduce((acc, curr) => {
    const index = acc.findIndex((item) => item.x === curr.x);
    if (index === -1) {
      acc.push(curr);
    } else {
      acc[index].y += curr.y;
    }
    return acc;
  }, []);
});
</script>

<template>
  <VNavbar />
  <div class="px-4 my-6">
    <h2 class="text-2xl font-bold mb-4">
      Today"s Cryptocurrency Prices by Market Cap
    </h2>

    <div class="grid grid-cols-5 gap-4 mb-8">
      <CryptoCard
        v-for="coin in coins.slice(0, 5)"
        :id="coin.id"
        :key="coin.id"
        :slug="coin.slug"
        :name="coin.name"
        :symbol="coin.symbol"
        :price="coin.quote.USD.price"
        :percent-change1h="coin.quote.USD.percent_change_1h"
      />
    </div>

    <div class="flex justify-between items-center mt-7 mb-4">
      <h2 class="text-2xl font-bold">Resume</h2>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <apexchart
        width="500"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
      <apexchart
        type="line"
        height="350"
        :options="lineOptions"
        :series="lineSeries"
      ></apexchart>
      <apexchart
        type="treemap"
        height="350"
        :options="treemapOptions"
        :series="treemapSeries"
      ></apexchart>
    </div>

    <div class="flex justify-between items-center mt-7 mb-4">
      <h2 class="text-2xl font-bold">Your Assets</h2>
      <VButton class="flex items-center py-2 px-4" @click="isModalOpen = true"
        ><svg
          class="mr-1.5"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.99996 4.16666C10.4602 4.16666 10.8333 4.53975 10.8333 4.99999V9.16666H15C15.4602 9.16666 15.8333 9.53975 15.8333 9.99999C15.8333 10.4602 15.4602 10.8333 15 10.8333H10.8333V15C10.8333 15.4602 10.4602 15.8333 9.99996 15.8333C9.53972 15.8333 9.16662 15.4602 9.16662 15V10.8333L4.99996 10.8333C4.53972 10.8333 4.16663 10.4602 4.16663 9.99999C4.16663 9.53975 4.53972 9.16666 4.99996 9.16666L9.16662 9.16666V4.99999C9.16662 4.53975 9.53972 4.16666 9.99996 4.16666Z"
            fill="black"
          />
        </svg>
        Add new asset</VButton
      >
    </div>

    <table class="border-collapse table-fixed w-full text-sm">
      <thead>
        <tr class="text-left bg-[#F6F6F6]">
          <th class="border-b font-medium p-4 pl-8 pb-3 text-dark text-left">
            Coin
          </th>
          <th class="border-b font-medium p-4 pl-8 pb-3 text-dark text-left">
            Amount
          </th>
          <th class="border-b font-medium p-4 pl-8 pb-3 text-dark text-left">
            Price
          </th>
          <th class="border-b font-medium p-4 pl-8 pb-3 text-dark text-left">
            Type
          </th>
          <th class="border-b font-medium p-4 pl-8 pb-3 text-dark text-left">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in transactions" :key="item.id">
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-500">
            <div class="flex items-center">
              <img
                :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.cryptocurrencyId}.png`"
                width="32"
                height="32"
                class="rounded-full mr-2"
              />
              {{ getCoinById(item.cryptocurrencyId).name }}
            </div>
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-500">
            {{ item.amount }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-500">
            {{ formatPrice(item.price) }}
          </td>
          <td
            class="border-b border-slate-700 p-4 pl-8 capitalize"
            :class="[item.type === 'buy' ? 'text-green-500' : 'text-red-500']"
          >
            {{ item.type }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-500">
            {{ fomatDate(item.created_at) }}
          </td>
        </tr>
      </tbody>
    </table>

    <VModal
      title="Add Transaction"
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @success="handleTransaction"
    >
      <form ref="form">
        <div class="mb-2">
          <VSelect v-model="transaction.type" label="Type" required>
            <VOption value="buy">Buy</VOption>
            <VOption value="sell">Sell</VOption>
          </VSelect>
        </div>
        <div class="mb-2">
          <VSelect v-model="transaction.cryptocurrencyId" label="Coin" required>
            <VOption v-for="coin in coins" :key="coin.id" :value="coin.id">{{
              coin.name
            }}</VOption>
          </VSelect>
        </div>
        <div class="mb-2">
          <VInput
            v-model="transaction.amount"
            type="number"
            label="Quantity"
            placeholder="0.00"
            step="0.010"
            required
          />
        </div>
        <div class="mb-2">
          <VInput
            v-model="transaction.price"
            type="number"
            label="Price Per Coin"
            placeholder="$0.00"
            step="0.010"
            required
          />
        </div>
      </form>
    </VModal>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
