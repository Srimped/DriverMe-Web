<template>
  <div>
    <DashboardLayout>
      <h2>App Setting</h2>
      
      <table class="w-full table-auto">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Key</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Value</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Description</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="setting in settings" :key="setting.id">
            <td class="p-3 text-sm text-gray-700"><p> {{ setting.id }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ setting.key }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ setting.value }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ setting.des }}</p></td>
            <td class="flex gap-1 p-3 text-sm text-gray-700">
              <RouterLink class="p-1 border border-gray-700 rounded" :to="`app/${setting.id}`">Update</RouterLink>
              <button class="p-1 border border-gray-700 rounded cursor-pointer" @click="deleteSetting(setting.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="settings.length === 0">No setting found.</p>

    </DashboardLayout>
  </div>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { ref } from 'vue';

const settings = ref([])

const loadSettings = () => {
  fetch(`http://localhost:5000/api/app`)
  .then(res => res.json())
  .then(data => {
    if (data && data.settings) {
        settings.value = data.settings; 
    } else {
        console.error("Response data is missing the 'settings' array:", data);
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  })
}


const deleteSetting = async (id) => {
  if (!confirm("Are you sure you want to delete this setting?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/app/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Delete failed: " + data.message);
      return;
    }

    alert("Setting deleted!");

    loadSettings();

  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete setting");
  }
};

loadSettings()
</script>