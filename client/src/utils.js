export const getFieldValues = form =>
  Object.keys(form).reduce((body, key) => {
    const origKey = key.split('@@')[0];

    body[origKey] = form[key];
    return body;
  }, {});

// admin@up.edu.ph
