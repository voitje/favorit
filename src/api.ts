import type { Good } from './types';

const API_URL = 'http://api.favorit-parts.ru/hs/hsprice/';

const API_KEY = '00000000-0000-0000-0000-000000000001'; // TODO

export const fetchBrands = async (number: string): Promise<Good[]> => {
  const url = `${API_URL}?key=${API_KEY}&number=${encodeURIComponent(number)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Ошибка сети при загрузке брендов');
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.goods || [];
};

export const fetchAnalogues = async (number: string, brand: string): Promise<Good[]> => {
  const url = `${API_URL}?key=${API_KEY}&number=${encodeURIComponent(number)}&brand=${encodeURIComponent(brand)}&analogues=on`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Ошибка сети при загрузке аналогов');
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.goods || [];
};