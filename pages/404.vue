<template>
  <div class="error-page">
    <h1>404 - Page Not Found</h1>
    <NuxtLink :to="{ name: 'cocktail-code', params: { code: 'margarita' } }" class="nav-link">
      Go to Margarita
    </NuxtLink>
  </div>
</template>

<style scoped>
  .error-page h1 {
    font-size: 30px;
    margin-bottom: 20px;
    color: var(--primary-color);
  }

  .error-page p {
    margin-bottom: 20px;
    font-size: 18px;
  }
</style>
