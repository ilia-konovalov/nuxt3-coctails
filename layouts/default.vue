<!-- layouts/default.vue -->
<template>
  <div>
    <nav class="container">
      <ul class="nav-list">
        <li v-for="cocktail in availableCocktails" :key="cocktail">
          <NuxtLink
            :to="{ name: 'cocktail-code', params: { code: cocktail } }"
            class="nav-link"
            active-class="active"
          >
            {{ cocktail.charAt(0).toUpperCase() + cocktail.slice(1) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { availableCocktails } from '~/types/cocktail'
</script>

<style scoped>
  .nav-list {
    display: flex;
    list-style: none;
    padding: 1rem 0;
    gap: 1rem;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    .nav-list {
      flex-direction: column;
    }
  }
</style>
