import { defineStore } from 'pinia'
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

  async function fetchCocktails(cocktailCode: CocktailCode) {
    // If we already have the data, don't fetch it again
    if (cocktails.value[cocktailCode]) {
      return
    }

    loading.value = true
    error.value = null

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
    }
  }

  return {
    cocktails,
    loading,
    error,
    getCocktailsByType,
    isLoading,
    getError,
    fetchCocktails
  }
})
