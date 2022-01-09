export const findImage = (imgQuery, page) => {
  const KEY = `24097500-b1b25815474c0bcb76303e859`;
  const baseUrl = `https://pixabay.com/api/?`;
  const url =
    baseUrl +
    `key=${KEY}` +
    `&q=${imgQuery}` +
    `&page=${page}` +
    `&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(result => {
    return result.json();
  });
};
