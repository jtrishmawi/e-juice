"use client";

import { cn } from "@/lib/utils";
import { Batch, BatchType } from "@/models/Batch";

type BottleProps = {
  batch?: BatchType;
  className?: string;
};

export const Bottle = ({ className, batch = Batch({}) }: BottleProps) => {
  const totalLiquids =
    batch.volume.base + batch.volume.boost + batch.volume.flavors;
  const totalHeight = batch.volume.total * (96 / 80);
  const baseHeight = (batch.volume.base / totalHeight) * 100;
  const nicotineHeight = (batch.volume.boost / totalHeight) * 100;
  const aromaHeight = (batch.volume.flavors / totalHeight) * 100;

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
            "absolute bottom-0 w-full hover:opacity-80 bg-yellow-500",
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
              <p className="text-center text-sm text-yellow-500">{`Base: ${batch.volume.base}ml`}</p>
              <p className="text-center text-sm text-red-500">{`Nicotine: ${batch.volume.boost}ml`}</p>
              <p className="text-center text-sm text-blue-500">{`Aromes: ${batch.volume.flavors}ml`}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
