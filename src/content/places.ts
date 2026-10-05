import type { Localized } from './profile';

// Places pinned on the globe, in the order the place card steps through them.
// Coordinates are decimal degrees, north and east positive.
export interface Place {
  id: string;
  lat: number;
  lon: number;
  name: Localized;
  country: Localized;
  period?: Localized;
  note?: Localized;
}

export const places: Place[] = [
  {
    id: 'shenyang',
    lat: 41.8057,
    lon: 123.4315,
    name: { en: 'Shenyang', zh: '沈阳' },
    country: { en: 'China', zh: '中国' },
    note: {
      en: 'Home.',
      zh: '家在这里。',
    },
  },
  {
    id: 'sydney',
    lat: -33.8886,
    lon: 151.1873,
    name: { en: 'Sydney', zh: '悉尼' },
    country: { en: 'Australia', zh: '澳大利亚' },
    period: { en: '2023 – present', zh: '2023 – 至今' },
    note: {
      en: 'Studying for a B.Eng. (Hons) in Software Engineering at the University of Sydney.',
      zh: '在悉尼大学攻读软件工程荣誉学士。',
    },
  },
  {
    id: 'shanghai',
    lat: 31.2304,
    lon: 121.4737,
    name: { en: 'Shanghai', zh: '上海' },
    country: { en: 'China', zh: '中国' },
    note: {
      en: 'Where I plan to build my career.',
      zh: '以后打算在这里发展。',
    },
  },
];

export function formatCoordinates({ lat, lon }: Pick<Place, 'lat' | 'lon'>) {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}° ${ns}, ${Math.abs(lon).toFixed(2)}° ${ew}`;
}
