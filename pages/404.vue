<template>
  <div class="error-page">
    <h1>404 - Page Not Found</h1>
    <p>The cocktail you're looking for doesn't exist.</p>
    <NuxtLink :to="{ name: 'cocktail-code', params: { code: 'margarita' } }" class="nav-link">
      Go to Margarita
    </NuxtLink>
  </div>
</template>

<style scoped>
  .error-page h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  .error-page p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }
</style>
