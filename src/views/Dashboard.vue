<template>
  <div class="bg-stone-200">
    <Sidebar>
      <nav class="mx-auto">
        <div>
          <h4 class="font-bold text-3xl mt-5">Welcome user</h4>
        </div>
        <div class="flex flex-col mt-10">
          <NavItem><a href="">Dasboard</a></NavItem>
          <NavItem><a href="">Dasboard</a></NavItem>
          <NavItem><a href="">Dasboard</a></NavItem>
          <NavItem><a href="">Dasboard</a></NavItem>
        </div>
      </nav>
    </Sidebar>
  </div>
</template>

<script setup>
import NavItem from '../layouts/NavItem.vue';
import Sidebar from '../layouts/Sidebar.vue';


</script>