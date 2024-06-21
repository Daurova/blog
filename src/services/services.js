const url = 'https://blog.kata.academy/api/';

export const getArticles = async (page = 1, key) => {
  const data = await fetch(
    `${url}/articles?offset=${page == 1 ? 0 : page == 2 ? 20 : page * 20}`,
    key
      ? {
          headers: {
            Authorization: `Token ${key}`,
          },
        }
      : {}
  );
  if (!data.ok) {
    throw data;
  }

  const response = await data.json();
  return { ...response, page };
};

