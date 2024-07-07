"use client";

import { cn } from "@/lib/utils";
import { Batch, BatchType } from "@/models/Batch";

type BottleProps = {
  batch?: BatchType;
  className?: string;
};

const tailwindBgColors = [
  // "bg-slate-500",
  // "bg-gray-500",
  // "bg-zinc-500",
  // "bg-neutral-500",
  // "bg-stone-500",
  // "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  // "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

const tailwindTextColors = [
  // "text-slate-500",
  // "text-gray-500",
  // "text-zinc-500",
  // "text-neutral-500",
  // "text-stone-500",
  // "text-red-500",
  "text-orange-500",
  "text-amber-500",
  "text-yellow-500",
  "text-lime-500",
  "text-green-500",
  "text-emerald-500",
  "text-teal-500",
  "text-cyan-500",
  "text-sky-500",
  // "text-blue-500",
  "text-indigo-500",
  "text-violet-500",
  "text-purple-500",
  "text-fuchsia-500",
  "text-pink-500",
  "text-rose-500",
];

export const Bottle = ({ className, batch = Batch({}) }: BottleProps) => {
  const totalLiquids =
    batch.volume.base + batch.volume.boost + batch.volume.flavors;
  const totalHeight = batch.volume.total * (96 / 80);
  const baseHeight = (batch.volume.base / totalHeight) * 100;
  const nicotineHeight = (batch.volume.boost / totalHeight) * 100;
  const aromaHeight = (batch.volume.flavors / totalHeight) * 100;
  const flavorsHeight = batch.flavors.map(
    (f) => (f.volume.total / batch.volume.flavors) * 100
  );

  const isOverfilled = totalLiquids > batch.volume.total;

  return (
    <div
      className={cn(
        "flex justify-center items-center h-full bg-gray-100 p-8 rounded-sm",
        className
      )}
    >
      <div className="relative w-40 h-96">
        <div className="absolute top-0 w-full h-12 bg-gray-800 rounded-t-full shadow-inner z-10"></div>
        <div className="absolute top-12 w-full h-4 bg-gray-600 shadow-inner z-10"></div>
        <div className="absolute top-16 w-full h-80 bg-gray-200 rounded-b-lg shadow-inner z-0"></div>
        <div
          className={cn(
            "absolute bottom-0 w-full hover:opacity-80 bg-blue-500",
            isOverfilled && "filter grayscale"
          )}
          style={{
            height: `${baseHeight}%`,
          }}
          title="Base"
        ></div>
        <div
          className={cn(
            "absolute bottom-0 w-full hover:opacity-80 bg-red-500",
            isOverfilled && "filter grayscale"
          )}
          style={{ height: `${nicotineHeight}%`, bottom: `${baseHeight}%` }}
          title="Nicotine"
        ></div>
        <div
          className={cn(
            "absolute bottom-0 w-full hover:opacity-80",
            isOverfilled && "filter grayscale"
          )}
          style={{
            height: `${aromaHeight}%`,
            bottom: `${baseHeight + nicotineHeight}%`,
          }}
          title="Aromes"
        >
          {batch.flavors.map((f, i) => (
            <div
              key={f.name}
              className={cn("w-full", tailwindBgColors[i])}
              style={{ height: `${flavorsHeight[i]}%` }}
            ></div>
          ))}
        </div>
        <div
          className={cn(
            "absolute top-1/3 left-1/2 transform -translate-x-1/2 w-32 bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center z-20",
            `h-${(3 + batch.flavors.length) * 8}`
          )}
        >
          {isOverfilled ? (
            <>
              <p className="text-center text-red-500 font-bold filter grayscale-0">
                la bouteille est trop petite !
              </p>
            </>
          ) : (
            <>
              <p className="text-center text-gray-800 font-bold">Mon Liquide</p>
              <p className="text-center text-sm text-blue-500">{`Base: ${batch.volume.base}ml`}</p>
              <p className="text-center text-sm text-red-500">{`Nicotine: ${batch.volume.boost}ml`}</p>
              {batch.flavors.map((f, i) => (
                <p
                  className={cn("text-center text-sm", tailwindTextColors[i])}
                  key={f.name}
                >
                  {`${f.name}: ${f.volume.total}ml`}
                </p>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
