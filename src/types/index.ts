export type Datas = {
  year: number;
  population: number;
  cement_co2: number;
  cement_co2_per_capita: number;
  cumulative_cement_co2: number;
  [key: string]: string | number | undefined;
};

export type JsonType = {
  [contry: string]: {
    iso_code: string;
    data: Datas[];
  };
};

export type CardPrimaryHeaderType = {
  iso_code: string;
  country: string;
  region: string;
  population: string | number;
  isOpen: boolean;
  onClick: () => void;
};
