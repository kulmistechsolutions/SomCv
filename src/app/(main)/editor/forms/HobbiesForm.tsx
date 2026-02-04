import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { hobbiesSchema, HobbiesValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function HobbiesForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<HobbiesValues>({
    resolver: zodResolver(hobbiesSchema),
    defaultValues: {
      hobbies: resumeData.hobbies || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        hobbies:
          values.hobbies
            ?.filter((hobby) => hobby !== undefined)
            .map((hobby) => hobby.trim())
            .filter((hobby) => hobby !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Hobbies</h2>
        <p className="text-sm text-muted-foreground">
          What are your interests and hobbies?
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Hobbies</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Reading, Photography, Traveling, Sports, ..."
                    onChange={(e) => {
                      const hobbies = e.target.value.split(",");
                      field.onChange(hobbies);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each hobby with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
