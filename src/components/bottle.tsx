"use client";

import { cn } from "@/lib/utils";

export const Bottle = ({
  base,
  nicotine,
  aroma,
  volume,
}: {
  base: number;
  nicotine: number;
  aroma: number;
  volume: number;
}) => {
  const totalLiquids = base + nicotine + aroma;
  const totalHeight = volume * (96 / 80);
  const baseHeight = (base / totalHeight) * 100;
  const nicotineHeight = (nicotine / totalHeight) * 100;
  const aromaHeight = (aroma / totalHeight) * 100;

  const isOverfilled = totalLiquids > volume;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-40 h-96">
        <div className="absolute top-0 w-full h-12 bg-gray-800 rounded-t-full shadow-inner z-10"></div>
        <div className="absolute top-12 w-full h-4 bg-gray-600 shadow-inner z-10"></div>
        <div className="absolute top-16 w-full h-80 bg-gray-200 rounded-b-lg shadow-inner z-0"></div>
        <div
          className={cn(
            "absolute bottom-0 w-full bg-blue-500",
            isOverfilled && "filter grayscale"
          )}
          style={{
            height: `${baseHeight}%`,
          }}
          title="Base"
        ></div>
        <div
          className={cn(
            "absolute bottom-0 w-full bg-red-500",
            isOverfilled && "filter grayscale"
          )}
          style={{ height: `${nicotineHeight}%`, bottom: `${baseHeight}%` }}
          title="Nicotine"
        ></div>
        <div
          className={cn(
            "absolute bottom-0 w-full bg-yellow-500",
            isOverfilled && "filter grayscale"
          )}
          style={{
            height: `${aromaHeight}%`,
            bottom: `${baseHeight + nicotineHeight}%`,
          }}
          title="Aromes"
        ></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center z-20">
          {isOverfilled ? (
            <>
              <p className="text-center text-red-500 font-bold filter grayscale-0">
                la bouteille est trop petite !
              </p>
            </>
          ) : (
            <>
              <p className="text-center text-gray-800 font-bold">Mon Liquide</p>
              <p className="text-center text-gray-700 text-sm">{`Base: ${base}ml`}</p>
              <p className="text-center text-gray-700 text-sm">{`Nicotine: ${nicotine}ml`}</p>
              <p className="text-center text-gray-700 text-sm">{`Aromes: ${aroma}ml`}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
