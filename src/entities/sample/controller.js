/**
 * This is just a sample controller in order to demonstrate how
 * the files will be organized according to their purpose.
 *
 * As for the verbs that we will be using, we'll use `get`,
 * `update`, `add`, and `delete`. Functions are to be named with
 * <verb> + <entity>. Example: getUser()
 */

export const getSample = ({ willError }) => {
  return new Promise((resolve, reject) => {
    const data = 'Hello, I am a sample.';
    /**
     * This is a demonstration of a promise. The promise will be
     * resolved after 3 seconds. If you want to try to have a rejected
     * promise (a request with error), try to issue a POST request with
     * `willError: true` on its payload.
     */

    setTimeout(() => {
      if (willError) return reject(500);
      else return resolve(data);
    }, 3000);
  });
};
