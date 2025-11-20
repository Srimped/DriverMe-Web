<template>
  <div>
    <DashboardLayout>
      <h2>Driver List</h2>
      
      <table class="w-full table-auto">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">License No</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">License plate</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Vehicle brand</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Vehicle model</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Vehicle type</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="driver in drivers" :key="driver.id">
            <td class="p-3 text-sm text-gray-700"><p> {{ driver.id }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ driver.licenseNo }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ driver.licensePlate }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ driver.brand }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ driver.model }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ driver.type }}</p></td>
            <td class="flex gap-1 p-3 text-sm text-gray-700">
              <RouterLink class="p-1 border border-gray-700 rounded" :to="`driver/${driver.id}`">Update</RouterLink>
              <button class="p-1 border border-gray-700 rounded cursor-pointer" @click="deleteDriver(driver.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="drivers.length === 0">No drivers found.</p>

    </DashboardLayout>
  </div>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { ref } from 'vue';

const drivers = ref([])

const loadDrivers = () => {
  fetch(`http://localhost:5000/api/driver`)
  .then(res => res.json())
  .then(data => {
    if (data && data.drivers) {
        drivers.value = data.drivers
    } else {
        console.error("Response data is missing the 'drivers' array:", data);
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  })
}


const deleteDriver = async (id) => {
  if (!confirm("Are you sure you want to delete this Driver?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/driver/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Delete failed: " + data.message);
      return;
    }

    alert("Driver deleted!");

    loadDrivers();

  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete driver");
  }
};

loadDrivers()
</script>