import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Category, insertCategorySchema } from "@shared/schema";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { generateSlug } from "@/lib/utils";

interface CategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
}

const formSchema = insertCategorySchema.extend({
  id: z.number().optional(),
});

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: category ? {
      ...category,
    } : {
      name: "",
      description: "",
      slug: "",
      imageUrl: "",
      isActive: true,
    },
  });

  // Auto-generate slug based on name
  const watchName = form.watch("name");
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("name", value);
    
    // Only auto-generate slug if it hasn't been manually edited or is empty
    if (!form.getValues("slug") || form.getValues("slug") === generateSlug(form.getValues("name"))) {
      form.setValue("slug", generateSlug(value));
    }
  };
  
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const url = data.id 
        ? `/api/categories/${data.id}` 
        : "/api/categories";
      
      const method = data.id ? "PATCH" : "POST";
      const response = await apiRequest(method, url, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      toast({
        title: category ? "Category Updated" : "Category Created",
        description: category 
          ? `${form.getValues().name} has been updated successfully.`
          : `${form.getValues().name} has been created successfully.`,
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Category mutation error:", error);
      toast({
        title: "Error",
        description: "There was an error saving the category. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter category name" 
                    {...field}
                    onChange={handleNameChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="category-slug" {...field} />
                </FormControl>
                <FormDescription>
                  Used for the URL (e.g., /shop/category-slug)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  URL to the category image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Active</FormLabel>
                <FormDescription>
                  Inactive categories won't be shown on the shop
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter category description"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {category ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
