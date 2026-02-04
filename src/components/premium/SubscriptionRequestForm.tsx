"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSubscriptionRequest } from "./actions";

const subscriptionRequestSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  plan: z.enum(["pro", "pro_plus"], {
    required_error: "Please select a plan",
  }),
});

type SubscriptionRequestFormValues = z.infer<typeof subscriptionRequestSchema>;

interface SubscriptionRequestFormProps {
  onSuccess?: () => void;
  defaultPlan?: "pro" | "pro_plus";
}

export default function SubscriptionRequestForm({
  onSuccess,
  defaultPlan,
}: SubscriptionRequestFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<SubscriptionRequestFormValues>({
    resolver: zodResolver(subscriptionRequestSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "+252613609678",
      plan: defaultPlan,
    },
  });

  // Update form when defaultPlan changes
  useEffect(() => {
    if (defaultPlan) {
      form.setValue("plan", defaultPlan);
    }
  }, [defaultPlan, form]);

  async function onSubmit(data: SubscriptionRequestFormValues) {
    try {
      setLoading(true);
      const result = await createSubscriptionRequest(data);

      if (result.success && result.whatsappUrl) {
        // Open WhatsApp with pre-filled message
        window.open(result.whatsappUrl, "_blank");
        toast({
          description: "WhatsApp opened! Please send the message to complete your subscription request.",
        });
        onSuccess?.();
      } else {
        throw new Error(result.error || "Failed to create subscription request");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your full name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+252613609678" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Plan</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a plan</option>
                  <option value="pro">Pro</option>
                  <option value="pro_plus">Pro Plus</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Processing..." : "Request Subscription via WhatsApp"}
        </Button>
      </form>
    </Form>
  );
}
