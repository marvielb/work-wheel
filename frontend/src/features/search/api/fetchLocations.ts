import { catalogClient } from '@/lib/api';

const fetchLocations = async () => {
  const { data } = await catalogClient.GET('/locations');
  return data;
};

export default fetchLocations;
