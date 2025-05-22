// src/app/page.tsx
'use client';

import { useState, useTransition, useEffect } from 'react';
import NextImage from 'next/image'; // Aliased to avoid conflict with Lucide's Image icon
import { UploadCloud, Copy, Loader2, Image as ImageIcon, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateCaptions } from './actions';

export default function InstaCaptionPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [captions, setCaptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // Limit file size to 4MB as an example
        setError("Image size should not exceed 4MB.");
        toast({ title: "File Too Large", description: "Image size should not exceed 4MB.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setCaptions([]); 
        setError(null); 
      };
      reader.onerror = () => {
        setError("Failed to read the image file.");
        toast({ title: "Error Reading File", description: "Could not read the selected image.", variant: "destructive" });
      }
      reader.readAsDataURL(file);
    }
  };

  const onGenerateCaptions = () => {
    if (!uploadedImage) {
      setError("Please upload an image first.");
      toast({ title: "No Image", description: "Please upload an image first.", variant: "destructive" });
      return;
    }
    setError(null);
    setCaptions([]); 
    startTransition(async () => {
      try {
        const result = await handleGenerateCaptions(uploadedImage);
        if (result.error) {
          setError(result.error);
          toast({ title: "Caption Generation Failed", description: result.error, variant: "destructive" });
        } else if (result.captions) {
          setCaptions(result.captions);
          toast({ title: "Success!", description: "Captions generated successfully." });
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(errorMessage);
        toast({ title: "Error", description: errorMessage, variant: "destructive" });
      }
    });
  };

  const handleCopyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption)
      .then(() => {
        toast({ title: "Copied!", description: "Caption copied to clipboard." });
      })
      .catch(err => {
        toast({ title: "Copy Failed", description: "Could not copy caption: " + (err instanceof Error ? err.message : String(err)), variant: "destructive" });
      });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-8 transition-colors duration-300">
      <header className="w-full max-w-3xl mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-10 w-10 text-primary" />
          <h1 className="text-4xl sm:text-5xl font-bold text-primary">InstaCaption</h1>
        </div>
        <p className="text-lg text-muted-foreground">Upload your photo and let AI craft the perfect captions!</p>
      </header>

      <main className="w-full max-w-3xl space-y-8">
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-card">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UploadCloud className="text-primary" /> Upload Your Photo
            </CardTitle>
            <CardDescription>Select an image (max 4MB) from your device to get started.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <label htmlFor="photo-upload" className={`cursor-pointer block w-full p-6 border-2 border-dashed border-border rounded-lg hover:border-primary transition-all duration-200 ease-in-out ${uploadedImage ? 'border-primary' : 'hover:bg-muted/50'}`}>
                {uploadedImage ? (
                  <div className="relative w-full h-64 sm:h-80 rounded-md overflow-hidden group">
                    <NextImage src={uploadedImage} alt="Uploaded preview" layout="fill" objectFit="contain" className="transition-transform duration-300 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 text-muted-foreground h-64 sm:h-80">
                    <ImageIcon size={56} className="mb-2 opacity-70" />
                    <span className="font-medium">Click to browse or drag & drop</span>
                    <span className="text-sm">PNG, JPG, GIF up to 4MB</span>
                  </div>
                )}
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/png, image/jpeg, image/gif, image/webp"
                onChange={handleFileChange}
                className="hidden"
                disabled={isPending}
              />
              {uploadedImage && (
                <Button onClick={onGenerateCaptions} disabled={isPending || !uploadedImage} className="w-full text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" /> Generate Captions
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isPending && (
          <Card className="shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="bg-card">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Loader2 className="animate-spin text-primary" /> Crafting Captions...
              </CardTitle>
              <CardDescription>Our AI is working its magic on your photo!</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg bg-muted h-16 animate-pulse">
                   <div className="h-4 bg-foreground/10 rounded w-3/4"></div>
                   <div className="h-3 bg-foreground/10 rounded w-1/2 mt-2"></div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {error && !isPending && (
          <Card className="shadow-xl rounded-xl border-destructive bg-destructive/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive text-2xl">
                <AlertTriangle /> Oops! Something went wrong.
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-destructive-foreground opacity-90">{error}</p>
            </CardContent>
          </Card>
        )}

        {!isPending && captions.length > 0 && (
          <Card className="shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="bg-card">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="text-primary" /> Your AI-Generated Captions
              </CardTitle>
              <CardDescription>Here are some captions for your photo. Use the copy icon to save your favorite!</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {captions.map((caption, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-secondary hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1">
                  <p className="text-secondary-foreground flex-1 mr-3 leading-relaxed">{caption}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyCaption(caption)}
                    className="text-accent hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent rounded-full"
                    aria-label="Copy caption"
                  >
                    <Copy size={20} />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="w-full max-w-3xl mt-16 mb-8 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear !== null ? currentYear : ''} InstaCaption. Powered by AI creativity.</p>
      </footer>
    </div>
  );
}
