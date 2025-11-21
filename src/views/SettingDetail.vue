<template>
  <div class="w-full mx-auto">
    <DashboardLayout>

      <!-- Loading -->
      <div v-if="isLoading" class="p-8 text-center text-lg text-indigo-600">
          <svg class="animate-spin h-5 w-5 mr-3 inline text-indigo-500" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading setting
      </div>

      <!-- Not found -->
      <div v-else-if="!setting" class="p-8 text-center text-red-600 border border-red-200 bg-red-50 rounded-lg">
        Setting not found (ID: {{ params.id }})
      </div>

      <!-- Form -->
      <form v-else class="max-w-3xl mx-auto p-6 lg:p-10" @submit.prevent="updateSetting">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-xl font-bold text-gray-700">Setting modification (ID: {{ setting.id }})</h2>
          <p class="mt-1 text-sm text-gray-500">{{ setting.key }}</p>

          <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Key</label>
              <input class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300"
                     type="text" 
                     v-model="setting.key">
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Value</label>
              <input class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300"
                     type="text" 
                     v-model="setting.value">
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea v-model="setting.des" rows="4" cols="50" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300">{{ setting.des }}</textarea>
            </div>

          </div>

        </div>

        <div class="mt-8 flex items-center justify-end gap-x-6">
          <RouterLink :to="`/app`" class="text-sm font-semibold leading-6 text-gray-900 hover:text-white hover:bg-gray-500 transition px-2 py-1 rounded-sm cursor-pointer">
            Back
          </RouterLink>
          <button type="submit"
                  class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 cursor-pointer">
            Save Changes
          </button>
        </div>
      </form>

    </DashboardLayout>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const { params } = useRoute();

const setting = ref(null);
const isLoading = ref(true);

const fetchSetting = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/app/${params.id}`);
    const data = await res.json();

    if (!res.ok || !data.setting) {
      setting.value = null;
      return;
    }

    setting.value = data.setting;

  } catch (err) {
    console.error("Fetch error:", err);
    setting.value = null;
  } finally {
    isLoading.value = false;
  }
};

const updateSetting = async () => {
  try {
    const body = {
      id: setting.value.id,
      key: setting.value.key,
      value: setting.value.value,
      des: setting.value.des
    };

    const res = await fetch(`http://localhost:5000/api/app/${setting.value.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const raw = await res.text();
    console.log("SERVER RAW RESPONSE:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error("Server did NOT return JSON");
      alert("Server error. Check backend console.");
      return;
    }

    if (!res.ok) {
      alert("Error updating setting: " + data.message);
      return;
    }
    console.log("BODY SENT:", body);


    alert("Setting updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Error updating setting.");
  }
};



fetchSetting();
</script>
