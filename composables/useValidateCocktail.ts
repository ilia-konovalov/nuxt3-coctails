import { availableCocktails, type CocktailCode } from '~/types/cocktail'

export function useValidateCocktail() {
  const router = useRouter()

  const validateAndRedirect = async (code: CocktailCode | string) => {
    if (!availableCocktails.includes(code as CocktailCode)) {
      await router.push('/404')
      return false
    }
    return true
  }

  return {
    validateAndRedirect
  }
}
