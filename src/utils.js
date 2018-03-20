export const formatQueryParams = query =>
  query.reduce((field, key, i) => {
    field += `${key} = :${key}${i === query.length - 1 ? '' : ', '}`;
    return field;
  }, '');

export const filtered = (payload = {}, attributes) =>
  Object.keys(payload).filter(key => attributes.includes(key));
