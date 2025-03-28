import type { Cocktail, CocktailCode } from '~/types/cocktail'

export const useCocktailsStore = defineStore('cocktails', () => {
  const cocktails = ref<Record<string, Cocktail[]>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getCocktailsByType = computed(() => {
    return (type: CocktailCode) => cocktails.value[type] || []
  })

  const isLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  function getIngredients(cocktail: Cocktail) {
    const ingredients: string[] = []
    for (let i = 1; i <= 10; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail]
      const measure = cocktail[`strMeasure${i}` as keyof Cocktail]

      if (ingredient) {
        ingredients.push(`${measure || ''} ${ingredient}`.trim())
      }
    }
    return ingredients
  }

  async function fetchCocktails(cocktailCode: CocktailCode) {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailCode}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch cocktails')
      }

      const data = await response.json()

      if (!data.drinks) {
        throw new Error('No cocktails found')
      }

      cocktails.value[cocktailCode] = data.drinks
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
      error.value = null
    }
  }

  return {
    cocktails,
    loading,
    error,
    getCocktailsByType,
    isLoading,
    getError,
    getIngredients,
    fetchCocktails
  }
})
