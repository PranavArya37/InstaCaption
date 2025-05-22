// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview A flow to generate captions for an image.
 *
 * - generateImageCaption - A function that handles the caption generation process.
 * - GenerateImageCaptionInput - The input type for the generateImageCaption function.
 * - GenerateImageCaptionOutput - The return type for the generateImageCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageCaptionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo to generate captions for, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type GenerateImageCaptionInput = z.infer<typeof GenerateImageCaptionInputSchema>;

const GenerateImageCaptionOutputSchema = z.object({
  captions: z.array(z.string()).describe('A list of captions for the photo.'),
});
export type GenerateImageCaptionOutput = z.infer<typeof GenerateImageCaptionOutputSchema>;

export async function generateImageCaption(input: GenerateImageCaptionInput): Promise<GenerateImageCaptionOutput> {
  return generateImageCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImageCaptionPrompt',
  input: {schema: GenerateImageCaptionInputSchema},
  output: {schema: GenerateImageCaptionOutputSchema},
  prompt: `You are an AI caption generator for social media.  You are given a photo, and you generate a list of captions that are appropriate for the photo.  The captions should be short and engaging.

  Photo: {{media url=photoDataUri}}

  Generate three different captions for the photo.`,
});

const generateImageCaptionFlow = ai.defineFlow(
  {
    name: 'generateImageCaptionFlow',
    inputSchema: GenerateImageCaptionInputSchema,
    outputSchema: GenerateImageCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
