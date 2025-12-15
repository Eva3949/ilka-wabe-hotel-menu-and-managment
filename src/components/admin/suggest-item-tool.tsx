'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { getFullMenuAsString, suggestMenuItemAction } from '@/app/actions';
import type { SuggestMenuItemOutput } from '@/ai/flows/suggest-menu-item';

const formSchema = z.object({
  restaurantType: z.string().min(3, 'Restaurant type is required.'),
  currentMenu: z.string().optional(),
  trendingIngredients: z.string().min(3, 'Trending ingredients are required.'),
});

export function SuggestItemTool() {
  const [suggestion, setSuggestion] = useState<SuggestMenuItemOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantType: 'Italian Bistro',
      currentMenu: '',
      trendingIngredients: 'Spicy honey, plant-based cheese, fermented foods',
    },
  });
  
  useEffect(() => {
    async function fetchMenu() {
        const menuString = await getFullMenuAsString();
        form.setValue('currentMenu', menuString);
    }
    fetchMenu();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const result = await suggestMenuItemAction(values);
    if (result.success) {
      setSuggestion(result.data!);
    } else {
      setError(result.error!);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Suggestions</CardTitle>
          <CardDescription>Generate a new menu item idea based on your restaurant's profile and market trends.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="restaurantType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Italian, Mexican, Cafe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trendingIngredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trending Ingredients or Concepts</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Ube, Gochujang, Sustainable Seafood" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentMenu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Menu (auto-filled)</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="Your current menu items..." {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Suggestion
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Generated Suggestion</CardTitle>
          <CardDescription>Here's what our culinary AI came up with.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          {isLoading && <Loader2 className="h-12 w-12 animate-spin text-primary" />}
          {error && <p className="text-destructive">{error}</p>}
          {!isLoading && !error && suggestion && (
            <div className="text-left w-full space-y-4 animate-in fade-in-50">
                <h3 className="text-2xl font-headline font-bold text-primary">{suggestion.suggestedItemName}</h3>
                <p className="font-semibold text-muted-foreground">{suggestion.suggestedItemType}</p>
                <p>{suggestion.suggestedItemDescription}</p>
                <div className="p-4 bg-secondary/50 rounded-md">
                    <h4 className="font-bold flex items-center mb-2"><Sparkles className="h-4 w-4 mr-2 text-primary"/>Reasoning</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                </div>
            </div>
          )}
          {!isLoading && !error && !suggestion && (
            <div className="text-center text-muted-foreground">
              <p>Your suggestion will appear here once generated.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
