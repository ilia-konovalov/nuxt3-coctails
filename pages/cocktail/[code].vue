<template>
  <div>
    <div v-if="error" class="error-page">
      <h1>Error</h1>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="isLoading" class="loading">Loading...</div>

    <div v-else class="cocktails-grid">
      <div v-for="cocktail in cocktails" :key="cocktail.idDrink" class="cocktail-card">
        <div class="cocktail-image">
          <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" loading="lazy" />
        </div>
        <div class="cocktail-info">
          <h2>{{ cocktail.strDrink }}</h2>
          <p class="cocktail-info-item"><strong>Category:</strong> {{ cocktail.strCategory }}</p>
          <p class="cocktail-info-item"><strong>Type:</strong> {{ cocktail.strAlcoholic }}</p>
          <p class="cocktail-info-item"><strong>Glass:</strong> {{ cocktail.strGlass }}</p>

          <h3>Instructions:</h3>
          <p class="cocktail-info-item">{{ cocktail.strInstructions }}</p>

          <h3>Ingredients:</h3>
          <ul class="cocktail-info-list">
            <li
              v-for="ingredient in cocktailStore.getIngredients(cocktail)"
              :key="ingredient"
              class="cocktail-info-item"
            >
              {{ ingredient }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCocktailsStore } from '~/stores/cocktails'
  import type { CocktailCode } from '~/types/cocktail'
  import { useValidateCocktail } from '~/composables/useValidateCocktail'

  const route = useRoute()
  const cocktailStore = useCocktailsStore()
  const { getCocktailsByType, isLoading, getError } = storeToRefs(cocktailStore)

  const code = computed(() => route.params['code'] as CocktailCode)
  const cocktails = computed(() => getCocktailsByType.value(code.value))
  const error = computed(() => getError.value)

  const { validateAndRedirect } = useValidateCocktail()

  onMounted(async () => {
    const isValid = await validateAndRedirect(code.value)
    if (isValid) {
      await cocktailStore.fetchCocktails(code.value)
    }
  })
</script>

<style scoped>
  .cocktails-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px 0;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .cocktail-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .cocktail-image {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
  }

  .cocktail-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .cocktail-image img:hover {
    transform: scale(1.05);
  }

  .cocktail-info {
    padding: 20px;
  }

  .cocktail-info h2 {
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  .cocktail-info h3 {
    margin: 15px 0 10px;
    color: var(--primary-color);
  }

  .cocktail-info-list {
    list-style-position: inside;
    margin-left: 15px;
  }

  .cocktail-info-item {
    margin-bottom: 10px;
    line-height: 1.4;
  }
</style>
