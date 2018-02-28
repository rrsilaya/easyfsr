import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * Include the documentation here. This is powered by apidoc. Just follow the
 * template markup below to generate the documentation.
 *
 * Start by providing general information.
 * @api {get} /sample getSample
 * @apiGroup Sample
 * @apiName getSample
 *
 * Next, we'll specify the parameters. We can have `(Body Params)` and `(Query Params)`.
 * @apiParam (Body Params) {String} sample This is just a sample parameter.
 * @apiParam (Query Params) {Boolean} sampleBoolean Sample boolean parameter.
 *
 * Next, we'll provide the payload that we'll return if the request is successful.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        sample: "Hello, I am a sample."
 *     }
 *   }
 *
 * Next, we'll provide what it will look if our servers fucked up.
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "errors": [
 *       "Something went wrong with our servers. :("
 *     ]
 *   }
 *
 * Now, try running `yarn docs` in your terminal and then start the
 * development server.
 */
const getSample = async (req, res) => {
  try {
    /**
     * Notice the use of `await` keyword on the following line. Since you
     * declared that this function will be an asynchronous one with the keyword
     * `async`, you can say that you should wait for the function `Ctrl.getSample(...)`
     * to finish executing first before proceeding to the next lines. (Remember that
     * JavaScript is asynchronous by its nature.)
     */
    const sample = await Ctrl.getSample(req.body);

    res.status(200).json({
      data: { sample },
    });
  } catch (status) {
    /**
     * In case the promise from `Ctrl.getSample(...)` is rejected due to some errors,
     * the next thing to execute is the lines below this.
     */
    res
      .status(status)
      .json({ errors: ['Internal server error while getting sample'] });
  }
};

/**
 * Specify the available routes for each entity here.
 */
router.get('/sample', getSample).post('/sample', getSample);

export default router;
