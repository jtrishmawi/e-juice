"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Batch, BatchType } from "@/models/Batch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Bottle } from "./bottle";

const formSchema = z.object({
  batch_volume: z.coerce.number(),
  batch_nicotin_concentration: z.coerce.number(),
  base_vg_percentage: z.coerce.number(),
  nicotin_concentration: z.coerce.number(),
  nicotin_vg_percentage: z.coerce.number(),
  flavors: z
    .object({
      name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" }),
      dosage: z.coerce.number(),
      vg_percentage: z.coerce.number(),
    })
    .array(),
});

export const Calculator = () => {
  const [isSimpleMode, setIsSimpleMode] = useState(true);
  const [result, setResult] = useState<BatchType>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batch_volume: 70,
      batch_nicotin_concentration: 6,
      base_vg_percentage: 50,
      nicotin_concentration: 20,
      nicotin_vg_percentage: 50,
      flavors: [{ name: "Arome 1", dosage: 11, vg_percentage: 50 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "flavors",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const batch = Batch(data);
    setResult(batch);
    console.log(batch);
  };

  useEffect(() => {
    form.handleSubmit(onSubmit)();
    const watcher = form.watch(() => form.handleSubmit(onSubmit)());
    return () => watcher.unsubscribe();
  }, [form]);

  return (
    <>
      <div className="flex items-center justify-end space-x-2 py-2">
        <Switch
          id="simple-mode"
          checked={isSimpleMode}
          onCheckedChange={setIsSimpleMode}
        />
        <Label htmlFor="simple-mode">Mode Facile</Label>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-8 lg:grid-cols-2 lg:grid-rows-3"
        >
          <Card>
            <CardHeader>
              <CardTitle>Ma recette</CardTitle>
              <CardDescription>
                veuillez renseigner ces informations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="batch_volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taille de votre bouteille</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="70" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="batch_nicotin_concentration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantite de nicotine requise</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="6" {...field} />
                    </FormControl>
                    <FormDescription>exprime en mg/mL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Bottle
            className="row-span-2 order-first lg:-order-none"
            batch={result}
          />
          <Card>
            <CardHeader>
              <CardTitle>Aromes</CardTitle>
              <CardDescription>
                vous pouvez ajouter, modifier ou supprimez des aromes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <FormField
                    control={form.control}
                    name={`flavors.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de l&apos;arome</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`flavors.${index}.dosage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosage en %</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!isSimpleMode && (
                    <FormField
                      control={form.control}
                      name={`flavors.${index}.vg_percentage`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VG en %</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {fields.length !== 1 && (
                    <Button
                      variant="destructive"
                      onClick={() => remove(index)}
                      className={cn(
                        form.formState.errors.flavors?.[index]
                          ? "self-center"
                          : "self-end"
                      )}
                    >
                      Supprimer
                    </Button>
                  )}
                  {index === fields.length - 1 && (
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        append({
                          name: `Arome ${fields.length + 1}`,
                          dosage: 0,
                          vg_percentage: 50,
                        })
                      }
                      className={cn(
                        form.formState.errors.flavors?.[index]
                          ? "self-center"
                          : "self-end"
                      )}
                    >
                      Ajouter
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          {!isSimpleMode && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Ma base</CardTitle>
                  <CardDescription>plus de details sur la base</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="base_vg_percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pourcentage en VG de la base</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} />
                        </FormControl>
                        <FormDescription>exprime en %</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Booster de nicotine</CardTitle>
                  <CardDescription>
                    plus de details sur le booster
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="nicotin_concentration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Concentration du booster de nicotine
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="20" {...field} />
                        </FormControl>
                        <FormDescription>exprime en mg/mL</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nicotin_vg_percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Pourcentage en VG du booster de nicotine
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} />
                        </FormControl>
                        <FormDescription>exprime en %</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </form>
      </Form>
    </>
  );
};
