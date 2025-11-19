<template>
  <div class="w-full mx-auto">
    <DashboardLayout>
        <!-- Loading state -->
        <div v-if="isLoading" class="p-8 text-center text-lg text-indigo-600">
            <svg class="animate-spin h-5 w-5 mr-3 inline text-indigo-500" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading user data...
        </div>

        <!-- Error/Not Found state -->
        <div v-else-if="!user" class="p-8 text-center text-red-600 border border-red-200 bg-red-50 rounded-lg">
            User not found or failed to load profile (ID: {{ params.id }})
        </div>

        <!-- Form when data is loaded -->
        <form v-else method="PUT" class="max-w-3xl mx-auto p-6 lg:p-10" @submit.prevent="updateUser">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-xl font-bold text-gray-700">Personal Information (ID: {{ user.id }})</h2>
                <p class="mt-1 text-sm text-gray-500">View and update user details.</p>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    
                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700" for="name">Full name</label>
                        <!-- Using v-model for potential future updates, initialized with user.name -->
                        <input 
                            class="block w-full rounded-md bg-gray-50/70 px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-600" 
                            type="text" 
                            name="name" 
                            id="name" 
                            v-model="user.name"
                        >
                    </div>

                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700" for="phone">Phone number</label>
                        <input 
                            class="block w-full rounded-md bg-gray-50/70 px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-600" 
                            type="text" 
                            name="phone" 
                            id="phone"
                            v-model="user.phone" 
                        >
                    </div>

                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700" for="avatar">Avatar URL</label>
                        <!-- Note: File inputs are complex; this uses a text input for the URL for simplicity -->
                        <input 
                            class="block w-full rounded-md bg-gray-50/70 px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-600" 
                            type="text" 
                            name="avatar" 
                            id="avatar"
                            v-model="user.avatar_url" 
                        >
                        <p v-if="user.avatar_url" class="mt-2 text-xs text-gray-500">Current URL: <a :href="user.avatar_url" target="_blank" class="text-indigo-600 hover:underline truncate">{{ user.avatar_url }}</a></p>
                    </div>
                </div>
            </div>

            <div class="border-b border-gray-900/10 pb-12 mt-10">
                <h2 class="text-base font-semibold text-gray-700">Status & Metrics</h2>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="role">Role</label>
                        <!-- Role is typically read-only for security reasons -->
                        <input 
                            class="block w-full rounded-md bg-gray-200/50 px-3 py-1.5 text-base text-gray-700 border border-gray-300 cursor-not-allowed" 
                            type="text" 
                            name="role" 
                            id="role"
                            :value="user.role"
                            disabled
                        >
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700">Activity</label>
                      <select v-model="user.active" class="block w-full rounded-md bg-gray-50 px-3 py-1.5 border">
                          <option :value="1">Active</option>
                          <option :value="0">De-Active</option>
                      </select>
                  </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Verification</label>
                      <select v-model="user.verified" class="block w-full rounded-md bg-gray-50 px-3 py-1.5 border">
                          <option :value="1">Verified</option>
                          <option :value="0">Unverified</option>
                      </select>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700" for="rating">Rating</label>
                      <input 
                          class="block w-full rounded-md bg-gray-50 px-3 py-1.5 border" 
                          type="number"
                          step="0.1"
                          id="rating"
                          v-model.number="user.rating"
                      >
                  </div>


                    <div>
                      <label class="block text-sm font-medium text-gray-700" for="trip">Total Trips</label>
                      <input 
                          class="block w-full rounded-md bg-gray-50 px-3 py-1.5 border" 
                          type="number"
                          id="trip"
                          v-model.number="user.total_trips"
                      >
                    </div>
                </div>
            </div>

            <div class="border-b border-gray-900/10 pb-12 mt-10">
                <h2 class="text-base font-semibold text-gray-700">Account Setting</h2>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
                        <input 
                            class="block w-full rounded-md bg-gray-50/70 px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-600" 
                            type="email" 
                            name="email" 
                            id="email"
                            :value="user.email"
                        >
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="password">Change Password (Leave blank to keep existing)</label>
                        <input 
                            v-model="password"
                            class="block w-full rounded-md bg-gray-50/70 px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-600" 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="********"
                        >
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="re-password">Re-enter New Password</label>
                        <input 
                            v-model="rePassword"
                            class="block w-full rounded-md bg-gray-50/70 px-3 py-1.5 text-base text-gray-900 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-600" 
                            type="password" 
                            name="re-password" 
                            id="re-password"
                            placeholder="********"
                        >
                    </div>
                </div>
            </div>
            
            <div class="mt-8 flex items-center justify-end gap-x-6">
                <RouterLink :to="`/user`" type="button" class="text-sm font-semibold leading-6 text-gray-900 hover:text-white hover:bg-gray-500 transition px-2 py-1 rounded-sm cursor-pointer">
                    Cancel
                </RouterLink>
                <button type="submit" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 cursor-pointer">
                    Save Changes
                </button>
            </div>
        </form>
    </DashboardLayout>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

const { params } = useRoute();

const user = ref(null); 
const isLoading = ref(true);
const password = ref('')
const rePassword = ref('')


const fetchUser = async () => {
    const userId = params.id;
    if (!userId) {
        isLoading.value = false;
        return;
    }

    try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}`);
        
        if (!res.ok) {
            const contentType = res.headers.get("content-type");
            let errorMessage = `HTTP error! Status: ${res.status}.`;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const errorData = await res.json();
                errorMessage += ` Server message: ${errorData.status}`;
            }
            throw new Error(errorMessage);
        }

        const data = await res.json();
        
        if (data && data.user) {
            user.value = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name, 
                phone: data.user.phone || '',
                avatar_url: data.user.avatar_url || '',
                role: data.user.role,
                active: data.user.active, 
                verified: data.user.verified || false,
                rating: data.user.rating || 0,
                total_trips: data.user.total_trips || 0,
            };
        } else {
            console.error("User not found or response structure is incorrect.", data);
            user.value = null;
        }

    } catch (error) {
        console.error("Error fetching user data:", error.message);
        user.value = null; 
    } finally {
        isLoading.value = false;
    }
}

const updateUser = async () => {
    try {
        if (password.value || rePassword.value) {
            if (password.value !== rePassword.value) {
                alert("Passwords do not match!");
                return;
            }
        }

        const body = {
            id: user.value.id,
            email: user.value.email,
            full_name: user.value.name,
            phone: user.value.phone,
            avatar_url: user.value.avatar_url,
            role: user.value.role,

            is_active: user.value.active ? 1 : 0,
            is_verified: user.value.verified ? 1 : 0,

            rating: Number(user.value.rating),
            total_trips: Number(user.value.total_trips),

            password: password.value ? password.value : null
        };

        const res = await fetch(`http://localhost:5000/api/user/${user.value.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
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
            alert("Error updating user: " + data.message);
            return;
        }

        alert("User updated successfully!");
    } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update user");
    }
};




fetchUser();
</script>