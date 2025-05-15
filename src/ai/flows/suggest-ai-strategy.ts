// 'use server';
/**
 * @fileOverview AI strategy suggestion flow.
 *
 * - suggestAiStrategy - A function that suggests personalized AI strategy approaches.
 * - SuggestAiStrategyInput - The input type for the suggestAiStrategy function.
 * - SuggestAiStrategyOutput - The return type for the suggestAiStrategy function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAiStrategyInputSchema = z.object({
  companyProfile: z
    .string()
    .describe('A description of the company, its industry, and its goals.'),
  kmuArchetypes: z.string().describe('The KMU archetypes that best fit the user profile.'),
});

export type SuggestAiStrategyInput = z.infer<typeof SuggestAiStrategyInputSchema>;

const SuggestAiStrategyOutputSchema = z.object({
  strategySuggestion: z
    .string()
    .describe('A personalized AI strategy suggestion for the company.'),
});

export type SuggestAiStrategyOutput = z.infer<typeof SuggestAiStrategyOutputSchema>;

export async function suggestAiStrategy(input: SuggestAiStrategyInput): Promise<SuggestAiStrategyOutput> {
  return suggestAiStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAiStrategyPrompt',
  input: {schema: SuggestAiStrategyInputSchema},
  output: {schema: SuggestAiStrategyOutputSchema},
  prompt: `You are an AI strategy consultant specializing in providing tailored AI strategy suggestions for KMUs (small and medium-sized enterprises) in the DACH region.

  Based on the company profile and identified KMU archetypes, provide a concise and actionable AI strategy suggestion that aligns with their specific context and goals.

  Company Profile: {{{companyProfile}}}
  KMU Archetypes: {{{kmuArchetypes}}}

  Consider the unique challenges and opportunities for KMUs in adopting AI.

  Provide a strategy suggestion that is easy to understand and implement, even for companies without deep technical AI expertise.
  Do not include any introductory or concluding remarks. The suggestion should be direct.
  Do not number the suggestion.
  Do not include any disclaimers or cautionary language about the advice you are giving.
  Focus on immediate, impactful steps the company can take.
  Do not include links or references to external resources.
  The output must be in German.
  `,
});

const suggestAiStrategyFlow = ai.defineFlow(
  {
    name: 'suggestAiStrategyFlow',
    inputSchema: SuggestAiStrategyInputSchema,
    outputSchema: SuggestAiStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
