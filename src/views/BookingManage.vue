<template>
  <div>
    <DashboardLayout>
      <h2>Booking List</h2>
      
      <table class="w-full table-auto">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Duration</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Distance</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Price</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Payment</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Pickup address</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Destination</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="booking in bookings" :key="booking.id">
            <td class="p-3 text-sm text-gray-700"><p> {{ booking.id }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ booking.duration }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ booking.distance }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ booking.price }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ booking.payment }}</p></td>
            <td class="w-50 p-3 text-sm text-gray-700"><p>{{ booking.address }}</p></td>
            <td class="w-50 p-3 text-sm text-gray-700"><p>{{ booking.destination }}</p></td>
            <td class="p-3 text-sm text-gray-700"><p>{{ booking.status }}</p></td>
            <td class="flex gap-1 p-3 text-sm text-gray-700">
              <RouterLink class="p-1 border border-gray-700 rounded" :to="`booking/${booking.id}`">Update</RouterLink>
              <button class="p-1 border border-gray-700 rounded cursor-pointer" @click="deleteBooking(booking.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="bookings.length === 0">No Bookings found.</p>

    </DashboardLayout>
  </div>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { ref } from 'vue';

const bookings = ref([])

const loadBooking = () => {
  fetch(`http://localhost:5000/api/booking`)
  .then(res => res.json())
  .then(data => {
    if (data && data.bookings) {
        bookings.value = data.bookings
    } else {
        console.error("Response data is missing the 'bookings' array:", data);
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  })
}


const deleteBooking = async (id) => {
  if (!confirm("Are you sure you want to delete this Booking?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/booking/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Delete failed: " + data.message);
      return;
    }

    alert("Booking deleted!");

    loadBookings();

  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete booking");
  }
};

loadBooking()
</script>