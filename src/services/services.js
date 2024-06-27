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

  
  export const registerNewUser = async (userData) => {
    const data = await fetch(`${url}users`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: userData }),
    });
  
    if (!data.ok) {
      throw data;
    }
  
    const result = await data.json();
    localStorage.setItem('user', JSON.stringify(result.user));
    return result.user;
  };

  export const userLogin = async (userData) => {
    const data = await fetch(`${url}users/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: userData }),
    });
    if (!data.ok) {
      throw data;
    }
  
    const result = await data.json();
    localStorage.setItem('user', JSON.stringify(result.user));
    return result.user;
  };
  export const getUserInfo = async (key) => {
    const data = await fetch(`${url}user`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${key}`,
      },
    });
  
    if (!data.ok) {
      throw data;
    }
  
    const result = await data.json();
    console.log(result.user)
    return result.user;
  };

  export const updateUser = async (userData, key) => {
    const data = await fetch(`${url}user`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${key}`,
      },
      body: JSON.stringify({ user: userData }),
    });
    if (!data.ok) {
      throw data;
    }
    const result = await data.json();
    localStorage.setItem('user', JSON.stringify(result.user));
    return result.user;
  };