<template>
  <div class="flex min-h-screen bg-stone-200">
    <div class="w-64 bg-grey-50 border-r border-gray-500">
      <div class="py-4 px-6">
        <p class="text-2xl font-bold">Welcome User</p>
      </div>

      <div class="mt-10"><h3 class="mx-6 mb-2 text-xs text gray-400 uppercase tracking-widest">Main</h3>
        <a href="\dashboard" class="flex items-center mx-5 px-6 py-2.5 rounded-md text-gray-500 hover:text-orange-600 hover:bg-gray-700 transition">Dashboard</a>
      </div>

      <div class="mt-10"><h3 class="mx-6 mb-2 text-xs text gray-400 uppercase tracking-widest">Account</h3>
        <a href="\driver" class="flex items-center mx-5 px-6 py-2.5 rounded-md text-gray-500 hover:text-orange-600 hover:bg-gray-700 transition">Driver</a>
        <a href="\user" class="flex items-center mx-5 px-6 py-2.5 rounded-md text-gray-500 hover:text-orange-600 hover:bg-gray-700 transition">User</a>
      </div>

      <div class="mt-10"><h3 class="mx-6 mb-2 text-xs text gray-400 uppercase tracking-widest">Trip</h3>
        <a href="" class="flex items-center mx-5 px-6 py-2.5 rounded-md text-gray-500 hover:text-orange-600 hover:bg-gray-700 transition">Booking</a>
      </div>

      <div class="mt-10"><h3 class="mx-6 mb-2 text-xs text gray-400 uppercase tracking-widest">Setting</h3>
        <a href="\app" class="flex items-center mx-5 px-6 py-2.5 rounded-md text-gray-500 hover:text-orange-600 hover:bg-gray-700 transition">Application</a>
        <a href="\login" class="flex items-center mx-5 px-6 py-2.5 rounded-md text-gray-500 hover:text-orange-600 hover:bg-gray-700 transition">Logout</a>
      </div>
    </div>
  <div>
    <div>
      <slot/>
    </div>
  </div>

  </div>
</template>