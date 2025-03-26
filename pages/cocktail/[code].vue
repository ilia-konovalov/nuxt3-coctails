<template>
  <div>
    <div v-if="error" class="error-page">
      <h1>Error</h1>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="loading" class="loading">Loading...</div>

    <div v-else class="cocktails-grid">
      <div v-for="cocktail in cocktails" :key="cocktail.idDrink" class="cocktail-card">
        <div class="cocktail-image">
          <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" loading="lazy" />
        </div>
        <div class="cocktail-info">
          <h2>{{ cocktail.strDrink }}</h2>
          <p><strong>Category:</strong> {{ cocktail.strCategory }}</p>
          <p><strong>Type:</strong> {{ cocktail.strAlcoholic }}</p>
          <p><strong>Glass:</strong> {{ cocktail.strGlass }}</p>

          <h3>Instructions:</h3>
          <p>{{ cocktail.strInstructions }}</p>

          <h3>Ingredients:</h3>
          <ul>
            <li v-for="ingredient in getIngredients(cocktail)" :key="ingredient">
              {{ ingredient }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useCocktailsStore } from '~/stores/cocktails'
  import type { Cocktail, CocktailCode } from '~/types/cocktail'
  import { useValidateCocktail } from '~/composables/useValidateCocktail'

  const route = useRoute()
  const cocktailStore = useCocktailsStore()
  const { getCocktailsByType, isLoading, getError } = storeToRefs(cocktailStore)

  const code = computed(() => route.params['code'] as CocktailCode)
  const cocktails = computed(() => getCocktailsByType.value(code.value))
  const loading = computed(() => isLoading.value)
  const error = computed(() => getError.value)

  const { validateAndRedirect } = useValidateCocktail()

  function getIngredients(cocktail: Cocktail) {
    const ingredients: string[] = []
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail]
      const measure = cocktail[`strMeasure${i}` as keyof Cocktail]

      if (ingredient) {
        ingredients.push(`${measure || ''} ${ingredient}`.trim())
      }
    }
    return ingredients
  }

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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
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
    padding: 1.5rem;
  }

  .cocktail-info h2 {
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  .cocktail-info h3 {
    margin: 1rem 0 0.5rem;
    color: var(--primary-color);
  }

  .cocktail-info ul {
    list-style-position: inside;
    margin-left: 1rem;
  }

  .cocktail-info p {
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
</style>
