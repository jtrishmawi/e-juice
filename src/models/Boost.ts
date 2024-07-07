interface BoostConstructor {
  nicotin_concentration: number;
  vg_percentage: number;
  pg_percentage: number;
  batch_nicotin_concentration: number;
  batch_volume: number;
}

export class Boost {
  nicotin_concentration: number;
  vg_percentage: number;
  pg_percentage: number;
  batch_nicotin_concentration: number;
  batch_volume: number;
  _volume: number;

  constructor({
    nicotin_concentration,
    vg_percentage,
    pg_percentage,
    batch_nicotin_concentration,
    batch_volume,
  }: BoostConstructor) {
    this.nicotin_concentration = nicotin_concentration;
    this.vg_percentage = vg_percentage / 100;
    this.pg_percentage = pg_percentage / 100;
    this.batch_nicotin_concentration = batch_nicotin_concentration;
    this.batch_volume = batch_volume;
    this._volume = Math.round(
      (this.batch_nicotin_concentration / this.nicotin_concentration) *
        this.batch_volume
    );
  }

  get volume() {
    return {
      total: this._volume,
      PG: this.PGVolume,
      VG: this.VGVolume,
    };
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
    return Math.round(this._volume * this.pg_percentage);
  }

  get VGWeight() {
    return Math.round(this._volume * this.vg_percentage);
  }
}
