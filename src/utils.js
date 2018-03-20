export const formatQueryParams = query =>
  query.reduce((field, key, i) => {
    field += `${key} LIKE :${key}${i === query.length - 1 ? '' : ' AND '}`;
    return field;
  }, '');

export const filtered = (payload = {}, attributes) =>
  Object.keys(payload).filter(key => attributes.includes(key));

export const escapeSearch = (query, appendList, limit = 10) => {
  query.limit = parseInt(limit);

  appendList.forEach(key => {
    if (query.hasOwnProperty(key)) {
      query[key] = `%${query[key]}%`;
    }
  });

  return query;
};
