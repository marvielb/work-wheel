import { catalogClient } from '@/lib/api';

const fetchLocations = async (token: string) => {
  const { data } = await catalogClient.GET('/locations', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export default fetchLocations;
