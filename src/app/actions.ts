// src/app/actions.ts
'use server';

import { generateImageCaption, type GenerateImageCaptionInput, type GenerateImageCaptionOutput } from '@/ai/flows/generate-image-caption';

interface ActionResult {
  captions?: string[];
  error?: string;
}

export async function handleGenerateCaptions(photoDataUri: string): Promise<ActionResult> {
  if (!photoDataUri) {
    return { error: 'No image data provided.' };
  }

  try {
    const input: GenerateImageCaptionInput = { photoDataUri };
    // console.log("Sending to AI:", input.photoDataUri.substring(0,100) + "..."); // For debugging, careful with logging full data URI
    const result: GenerateImageCaptionOutput = await generateImageCaption(input);
    
    if (!result.captions || result.captions.length === 0) {
        return { error: 'AI could not generate captions for this image. This might be due to the image content or a temporary issue. Try a different image or try again later.' };
    }
    return { captions: result.captions };

  } catch (e) {
    console.error('Error generating captions:', e);
    let errorMessage = 'An unexpected error occurred while generating captions.';
    if (e instanceof Error) {
        // Check for specific error messages that might be more user-friendly
        if (e.message.includes('400 Failed to parse model response') || e.message.includes('SAFETY') || e.message.includes('Invalid response')) {
            errorMessage = 'The image may have been rejected due to safety filters, or the AI could not process it. Please try a different image.';
        } else if (e.message.includes('Invalid media content') || e.message.includes('parse error')) {
            errorMessage = 'The image format might be invalid, corrupted, or too large. Please try a different image or a smaller version.';
        } else if (e.message.includes('Deadline exceeded') || e.message.includes('timeout')) {
            errorMessage = 'Caption generation timed out. Please try again shortly.';
        }
    }
    return { error: errorMessage };
  }
}
