export const fetchVBRData = async (route, apiKey, data) => {
  const url = `${import.meta.env.VITE_API_URL}${route}?${objectToQueryString(data)}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey || window.__MJSZ_VBR_WIDGET__.apiKey,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) return reject(response);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
};
