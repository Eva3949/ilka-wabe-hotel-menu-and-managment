'use server';

/**
 * @fileOverview An AI agent that suggests new menu items based on popular combinations or trending ingredients.
 *
 * - suggestMenuItem - A function that handles the menu item suggestion process.
 * - SuggestMenuItemInput - The input type for the suggestMenuItem function.
 * - SuggestMenuItemOutput - The return type for the suggestMenuItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMenuItemInputSchema = z.object({
  restaurantType: z
    .string()
    .describe('The type of restaurant (e.g., Italian, Mexican, Cafe).'),
  currentMenu: z
    .string()
    .describe('A list of the current menu items offered by the restaurant.'),
  trendingIngredients: z
    .string()
    .describe(
      'A list of trending ingredients or food combinations in the current culinary market.'
    ),
});
export type SuggestMenuItemInput = z.infer<typeof SuggestMenuItemInputSchema>;

const SuggestMenuItemOutputSchema = z.object({
  suggestedItemName: z.string().describe('The name of the suggested menu item.'),
  suggestedItemDescription: z
    .string()
    .describe('A brief description of the suggested menu item.'),
  suggestedItemType: z
    .string()
    .describe('The type or category of the suggested menu item (e.g., appetizer, entree, dessert, drink).'),
  reasoning: z
    .string()
    .describe('The reasoning behind suggesting this particular menu item.'),
});
export type SuggestMenuItemOutput = z.infer<typeof SuggestMenuItemOutputSchema>;

export async function suggestMenuItem(
  input: SuggestMenuItemInput
): Promise<SuggestMenuItemOutput> {
  return suggestMenuItemFlow(input);
}

const suggestMenuItemPrompt = ai.definePrompt({
  name: 'suggestMenuItemPrompt',
  input: {schema: SuggestMenuItemInputSchema},
  output: {schema: SuggestMenuItemOutputSchema},
  prompt: `You are a creative culinary expert tasked with suggesting new menu items for restaurants.

  Consider the restaurant type, current menu, and trending ingredients to come up with innovative suggestions that would appeal to customers.

  Restaurant Type: {{{restaurantType}}}
  Current Menu: {{{currentMenu}}}
  Trending Ingredients: {{{trendingIngredients}}}

  Based on this information, suggest a new menu item, including its name, description, type, and reasoning for the suggestion.
  Make sure that the suggestedItemType is compatible with the restaurant type.
  `,
});

const suggestMenuItemFlow = ai.defineFlow(
  {
    name: 'suggestMenuItemFlow',
    inputSchema: SuggestMenuItemInputSchema,
    outputSchema: SuggestMenuItemOutputSchema,
  },
  async input => {
    const {output} = await suggestMenuItemPrompt(input);
    return output!;
  }
);
