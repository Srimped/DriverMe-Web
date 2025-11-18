<template>
  <div>
    <DashboardLayout>
      <h2>User List</h2>
      
      <table class="w-full table-auto">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Role</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Active</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="user in users" :key="user.id">
            <td class="p-3 text-sm text-gray-700"><p> {{ user.id }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ user.name }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ user.email }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ user.role }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ user.active ? 'Yes' : 'No' }}</p></td>
            <td class="flex gap-1 p-3 text-sm text-gray-700">
              <a class="p-1 border border-gray-700 rounded" href="">Update</a>
              <a class="p-1 border border-gray-700 rounded" href="">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="users.length === 0">No users found.</p>

    </DashboardLayout>
  </div>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { ref } from 'vue';

const users = ref([])

fetch(`http://localhost:5000/api/user`)
  .then(res => res.json())
  .then(data => {
    if (data && data.users) {
        users.value = data.users; 
    } else {
        console.error("Response data is missing the 'users' array:", data);
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  })
</script>