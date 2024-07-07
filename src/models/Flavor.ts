import { PG, VG } from "./constants";

interface FlavorConstructor {
  name?: string;
  dosage?: number;
  vg_percentage?: number;
  pg_percentage?: number;
  batch_volume: number;
}

export class Flavor {
  name: string;
  dosage: number;
  vg_percentage: number;
  pg_percentage: number;
  batch_volume: number;
  _volume: number;

  constructor({
    name = "Wow",
    dosage = 0,
    batch_volume,
    vg_percentage = 50,
    pg_percentage = 50,
  }: FlavorConstructor) {
    this.name = name;
    this.dosage = dosage / 100;
    this.vg_percentage = vg_percentage / 100;
    this.pg_percentage = pg_percentage / 100;
    this.batch_volume = batch_volume;
    this._volume = Math.round(this.dosage * this.batch_volume);
  }

  get volume() {
    return { total: this._volume, PG: this.PGVolume, VG: this.VGVolume };
  }

  get PGVolume() {
    return Math.round(this._volume * this.pg_percentage);
  }

  get VGVolume() {
    return Math.round(this._volume * this.vg_percentage);
  }

  get weight() {
    return {
      total: this.PGWeight + this.VGWeight,
      PG: this.PGWeight,
      VG: this.VGWeight,
    };
  }

  get PGWeight() {
    return Math.round(this.PGVolume * PG);
  }

  get VGWeight() {
    return Math.round(this.VGVolume * VG);
  }
}
