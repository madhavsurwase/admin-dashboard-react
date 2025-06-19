'use server';

/**
 * @fileOverview AI flow for analyzing data insights using natural language queries.
 *
 * - analyzeData: Analyzes data from tables or charts based on natural language queries.
 * - AnalyzeDataInput: The input type for the analyzeData function, including the data and query.
 * - AnalyzeDataOutput: The return type for the analyzeData function, providing insights.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDataInputSchema = z.object({
  data: z.string().describe('The data from the selected table or chart, in JSON or CSV format.'),
  query: z.string().describe('The natural language query to analyze the data.'),
});
export type AnalyzeDataInput = z.infer<typeof AnalyzeDataInputSchema>;

const AnalyzeDataOutputSchema = z.object({
  insights: z.string().describe('The insights generated from the data based on the query.'),
});
export type AnalyzeDataOutput = z.infer<typeof AnalyzeDataOutputSchema>;

export async function analyzeData(input: AnalyzeDataInput): Promise<AnalyzeDataOutput> {
  return analyzeDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDataPrompt',
  input: {schema: AnalyzeDataInputSchema},
  output: {schema: AnalyzeDataOutputSchema},
  prompt: `You are an expert data analyst. Analyze the following data and provide insights based on the user's query.

Data: {{{data}}}

Query: {{{query}}}

Insights:`,
});

const analyzeDataFlow = ai.defineFlow(
  {
    name: 'analyzeDataFlow',
    inputSchema: AnalyzeDataInputSchema,
    outputSchema: AnalyzeDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
