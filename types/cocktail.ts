export interface Cocktail {
  idDrink: string
  strDrink: string
  strCategory: string
  strAlcoholic: string
  strGlass: string
  strInstructions: string
  strDrinkThumb: string
  [key: string]: string | null
}

export const availableCocktails = ['margarita', 'mojito', 'a1', 'kir'] as const
export type CocktailCode = (typeof availableCocktails)[number]
