import { PG, VG } from "./constants";

interface BaseConstructor {
  vg_percentage: number;
  pg_percentage: number;
  volume: number;
}

export class Base {
  vg_percentage: number;
  pg_percentage: number;
  _volume: number;

  constructor({ vg_percentage, pg_percentage, volume }: BaseConstructor) {
    this.vg_percentage = vg_percentage / 100;
    this.pg_percentage = pg_percentage / 100;
    this._volume = Math.round(volume);
  }

  get volume() {
    return { total: this._volume, PG: this.PGVolume, VG: this.VGVolume };
  }

  get VGVolume() {
    return Math.round(this._volume * this.vg_percentage);
  }

  get PGVolume() {
    return Math.round(this._volume * this.pg_percentage);
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
