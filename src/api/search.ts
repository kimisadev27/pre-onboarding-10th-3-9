import apiRequest from '.';

const RESOURCE = '/search';

export const doSearch = async (q: string) => {
  // export const doSearch = async ({ q, page, limit }: SearchProp) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`, {
      params: {
        q,
        // page: { page },
        // limit: { limit },
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('API doSearch error');
  }
};
