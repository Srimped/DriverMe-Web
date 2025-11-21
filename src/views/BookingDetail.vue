<template>
  <div class="w-full mx-auto">
    <DashboardLayout>

      <!-- Loading -->
      <div v-if="isLoading" class="p-8 text-center text-lg text-indigo-600">
          <svg class="animate-spin h-5 w-5 mr-3 inline text-indigo-500" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading user data...
      </div>

      <!-- Not found -->
      <div v-else-if="!booking" class="p-8 text-center text-red-600 border border-red-200 bg-red-50 rounded-lg">
        Booking not found (ID: {{ params.id }})
      </div>

      <!-- Form -->
      <form v-else class="max-w-3xl mx-auto p-6 lg:p-10" @submit.prevent="updateBooking">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-xl font-bold text-gray-700">Booking Detail (ID: {{ booking.id }})</h2>
          <p class="mt-10 text-base font-semibold text-gray-700">Customer</p>

          <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <!-- USER FULL NAME -->
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Full name</label>
              <input class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300 opacity-70 cursor-not-allowed"
                     type="text" 
                     :value="user.name"
                     disabled>
            </div>

            <!-- USER PHONE -->
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <input class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300 opacity-70 cursor-not-allowed"
                     type="text"
                     :value="user.phone"
                     disabled>
            </div>
          </div>

          <p class="mt-10 text-base font-semibold text-gray-700">Driver</p>

          <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <!-- DRIVER FULL NAME -->
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Full name</label>
              <input class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300 opacity-70 cursor-not-allowed"
                     type="text" 
                     :value="driver.name"
                     disabled>
            </div>

            <!-- DRIVER PHONE -->
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <input class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300 opacity-70 cursor-not-allowed"
                     type="text"
                     :value="driver.phone"
                     disabled>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">

          <div class="mt-10">
              <h2 class="text-base font-semibold text-gray-700">Booking</h2>
              <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Distance</label>
                  <input type="number" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300"
                        v-model="booking.distance">
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Duration</label>
                  <input class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300"
                        v-model="booking.duration">
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Payment</label>
                  <input disabled class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300 opacity-70 cursor-not-allowed"
                        v-model="booking.payment">
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Price</label>
                  <input type="number" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300"
                        v-model="booking.price">
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Status</label>
                  <input disabled class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300 opacity-70 cursor-not-allowed"
                        v-model="booking.status">
                </div>
              </div>

              <div class="mt-5 flex gap-5">
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Address</label>
                  <textarea v-model="booking.address" rows="4" cols="35" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300">{{ booking.address }}</textarea>
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Destination</label>
                  <textarea v-model="booking.destination" rows="4" cols="35" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300">{{ booking.destination }}</textarea>
                </div>
              </div>
            </div>
          </div>

        <div class="mt-8 flex items-center justify-end gap-x-6">
          <RouterLink :to="`/booking`" class="text-sm font-semibold leading-6 text-gray-900 hover:text-white hover:bg-gray-500 transition px-2 py-1 rounded-sm cursor-pointer">
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

const booking = ref(null)
const driver = ref(null)
const user = ref(null)
const isLoading = ref(true)

const fetchBooking = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/booking/${params.id}`);
    const data = await res.json();

    if (!res.ok || !data.booking) {
      booking.value = null;
      return;
    }

    booking.value = data.booking;
    driver.value = data.driver
    user.value = data.user;

  } catch (err) {
    console.error("Fetch error:", err);
    booking.value = null;
  } finally {
    isLoading.value = false;
  }
};

const updateBooking = async () => {
  try {
    const body = {
      id: booking.value.id,
      address: booking.value.address,
      destination: booking.value.destination,
      distance: booking.value.distance,
      duration: booking.value.duration,
      payment: booking.value.payment,
      price: booking.value.price,
      status: booking.value.status
    };

    const res = await fetch(`http://localhost:5000/api/booking/${booking.value.id}`, {
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
      alert("Error updating booking: " + data.message);
      return;
    }

    alert("Booking updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Error updating booking.");
  }
};


fetchBooking();
</script>
