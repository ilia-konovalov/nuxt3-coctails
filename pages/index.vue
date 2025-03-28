<template>
  <div>Redirecting...</div>
</template>

<script setup lang="ts">
  import { availableCocktails } from '~/types/cocktail'
  import { useValidateCocktail } from '~/composables/useValidateCocktail'

  const router = useRouter()
  const { validateAndRedirect } = useValidateCocktail()

  onMounted(async () => {
    const isValid = await validateAndRedirect(availableCocktails[0])
    if (isValid) {
      await router.replace({
        name: 'cocktail-code',
        params: { code: availableCocktails[0] }
      })
    }
  })
</script>
