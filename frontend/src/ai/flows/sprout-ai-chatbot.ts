'use server';
/**
 * @fileOverview An AI chatbot for farmers to answer questions about their farm.
 *
 * - sproutAIChatbot - A function that handles the chatbot interactions.
 * - SproutAIChatbotInput - The input type for the sproutAIChatbot function.
 * - SproutAIChatbotOutput - The return type for the sproutAIChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SproutAIChatbotInputSchema = z.object({
  query: z.string().describe('The question from the farmer.'),
});
export type SproutAIChatbotInput = z.infer<typeof SproutAIChatbotInputSchema>;

const SproutAIChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type SproutAIChatbotOutput = z.infer<typeof SproutAIChatbotOutputSchema>;

export async function sproutAIChatbot(input: SproutAIChatbotInput): Promise<SproutAIChatbotOutput> {
  return sproutAIChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sproutAIChatbotPrompt',
  input: {schema: SproutAIChatbotInputSchema},
  output: {schema: SproutAIChatbotOutputSchema},
  prompt: `You are Sprout AI, an AI chatbot designed to help farmers with their questions about their farm.

  You should provide personalized insights and helpful information to assist them in making informed decisions.

  User Query: {{{query}}}`,
});

const sproutAIChatbotFlow = ai.defineFlow(
  {
    name: 'sproutAIChatbotFlow',
    inputSchema: SproutAIChatbotInputSchema,
    outputSchema: SproutAIChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
