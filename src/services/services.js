const url = 'https://blog.kata.academy/api/';

export const getArticles = async (page=1, key) => {
  const data = await fetch(
    `${url}/articles?offset=${page}`,
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

export const getArticle = async (slug= 'title-smv9p7', key) => {
    const data = await fetch(
      `${url}articles/${slug}`,
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
    return response;
  };