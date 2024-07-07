import { Base } from "./Base";
import { Boost } from "./Boost";
import { Flavor } from "./Flavor";

interface BatchConstructor {
  batch_volume?: number;
  base_vg_percentage?: number;
  batch_nicotin_concentration?: number;
  nicotin_concentration?: number;
  nicotin_vg_percentage?: number;
  flavors?: {
    name: string;
    dosage: number;
    vg_percentage: number;
  }[];
}

class BatchInstance {
  _volume: number;
  nicotin_concentration: number;
  base: Base;
  boost: Boost;
  flavors: Flavor[] = [];

  constructor({
    batch_volume = 70,
    base_vg_percentage = 50,
    batch_nicotin_concentration = 6,
    nicotin_concentration = 20,
    nicotin_vg_percentage = 50,
    flavors,
  }: BatchConstructor) {
    this._volume = batch_volume;
    this.nicotin_concentration = batch_nicotin_concentration;

    this.boost = new Boost({
      nicotin_concentration,
      vg_percentage: nicotin_vg_percentage,
      pg_percentage: 100 - nicotin_vg_percentage,
      batch_nicotin_concentration,
      batch_volume,
    });

    this.flavors =
      flavors?.map((flavor) => new Flavor({ ...flavor, batch_volume })) || [];

    this.base = new Base({
      vg_percentage: base_vg_percentage,
      pg_percentage: 100 - base_vg_percentage,
      volume: batch_volume - (this.flavorsVolume + this.boost.volume.total),
    });
  }

  get flavorsVolume() {
    return Math.round(
      this.flavors.reduce((acc, flavor) => {
        return acc + flavor.volume.total;
      }, 0)
    );
  }

  get flavorsWeight() {
    return Math.round(
      this.flavors.reduce((acc, flavor) => {
        return acc + flavor.weight.total;
      }, 0)
    );
  }

  get volume() {
    return {
      total: this._volume,
      flavors: this.flavorsVolume,
      boost: this.boost.volume.total,
      base: this.base.volume.total,
    };
  }

  get weight() {
    return {
      total:
        this.base.weight.total + this.boost.weight.total + this.flavorsWeight,
      flavors: this.flavorsWeight,
      boost: this.boost.weight.total,
      base: this.base.weight.total,
    };
  }
}

export type BatchType = ReturnType<typeof Batch>;

export const Batch = (data: BatchConstructor) => {
  const batch = new BatchInstance(data);
  return {
    volume: batch.volume,
    weight: batch.weight,
    base: {
      volume: batch.base.volume,
      weight: batch.base.weight,
    },
    boost: {
      volume: batch.boost.volume,
      weight: batch.boost.weight,
    },
    flavors: batch.flavors.map((flavor) => ({
      name: flavor.name,
      dosage: flavor.dosage,
      volume: flavor.volume,
      weight: flavor.weight,
    })),
    flavorsVolume: batch.flavorsVolume,
    flavorsWeight: batch.flavorsWeight,
  };
};
