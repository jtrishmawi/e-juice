"use client";

import { Bottle } from "@/components/bottle";
import { Button } from "@/components/ui/button";
import { Fieldset } from "@/components/ui/fieldset";
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
import { cn } from "@/lib/utils";
import { Batch, BatchType } from "@/models/Batch";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod/v4";

const formSchema = z.object({
  batch_volume: z.int(),
  batch_nicotin_concentration: z.int(),
  base_vg_percentage: z.int(),
  nicotin_concentration: z.int(),
  nicotin_vg_percentage: z.int(),
  flavors: z
    .object({
      name: z
        .string()
        .min(3, { error: "Le nom doit comporter au moins 3 caractères." }),
      dosage: z.int(),
      vg_percentage: z.int(),
    })
    .array(),
});

export const Calculator = () => {
  const [isSimpleMode, setIsSimpleMode] = useState(true);
  const [result, setResult] = useState<BatchType>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batch_volume: 75,
      batch_nicotin_concentration: 3,
      base_vg_percentage: 50,
      nicotin_concentration: 20,
      nicotin_vg_percentage: 50,
      flavors: [{ name: "Arome 1", dosage: 14, vg_percentage: 50 }],
    },
  });

  const { control, handleSubmit, formState, subscribe } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "flavors",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const batch = Batch(data);
    console.log(batch);
  };

  useEffect(() => {
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        const batch = Batch(values);
        setResult(batch);
        console.log(batch);
      },
    });

    return () => callback();
  }, [subscribe]);

  return (
    <>
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          onClick={() => setIsSimpleMode(!isSimpleMode)}
          variant="outline"
        >
          {isSimpleMode ? "Mode avance" : "Mode simple"}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-8 md:grid-cols-2 lg:grid-rows-3"
        >
          <Fieldset
            title="Ma recette"
            description="veuillez renseigner ces informations"
          >
            <FormField
              control={control}
              name="batch_volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Taille de votre bouteille</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="70" {...field} />
                  </FormControl>
                  <FormDescription>exprime en mL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
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
          </Fieldset>
          <Bottle
            batch={result}
            className="row-span-1 lg:row-span-2 order-first md:order-none"
          />

          <Fieldset title="Aromes" description="ajoutez des aromes">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end border border-accent rounded-sm p-4"
              >
                <FormField
                  control={control}
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
                  control={control}
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
                    control={control}
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
                <div className="flex-1 flex gap-2 justify-end">
                  {fields.length !== 1 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                      className={cn(
                        formState.errors.flavors?.[index]
                          ? "self-center"
                          : "self-end"
                      )}
                    >
                      <CircleX />
                    </Button>
                  )}
                  {index === fields.length - 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        append({
                          name: `Arome ${fields.length + 1}`,
                          dosage: 0,
                          vg_percentage: 50,
                        })
                      }
                      className={cn(
                        formState.errors.flavors?.[index]
                          ? "self-center"
                          : "self-end"
                      )}
                    >
                      <PlusCircle />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </Fieldset>
          {!isSimpleMode && (
            <>
              <Fieldset
                title="Ma Base"
                description="plus de details sur la base"
              >
                <FormField
                  control={control}
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
              </Fieldset>
              <Fieldset
                title="Booster de nicotine"
                description="plus de details sur le booster"
              >
                <FormField
                  control={control}
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
                  control={control}
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
              </Fieldset>
            </>
          )}
        </form>
      </Form>
    </>
  );
};
