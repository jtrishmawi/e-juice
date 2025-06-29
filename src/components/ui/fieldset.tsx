"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronDownIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

type FieldsetProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const Fieldset = ({ title, description, children }: FieldsetProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description} </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    );
  }
  return (
    <Collapsible className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 dark:bg-gray-800">
        <h4 className="text-base font-semibold">{title}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            <ChevronDownIcon className="size-5 transition-transform duration-300 group-open:-rotate-180" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="p-4 text-sm text-gray-500 dark:text-gray-400">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-4">{children} </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

Fieldset.displayName = "Fieldset";

export { Fieldset };

