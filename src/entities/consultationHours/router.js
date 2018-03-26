import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();
/**
 * @api {post} /teachingLoad addTeachingLoad
 * @apiGroup Teaching Load
 * @apiName addTeachingLoad
 *
 * @apiParam (Body Params) {Integer} id ID of Teaching Load
 * @apiParam (Body Params) {Integer} teachingLoadCreds teaching load credits of Teaching Load
 *
 * @apiSuccess {Object} teachingLoad new Teaching Load created
 * @apiSuccess {Integer} teachingLoad.id ID of Teaching Load
 * @apiSuccess {Integer} teachingLoad.teachingLoadCreds teaching load credits of Teaching load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully created teaching load details",
 *     "data": [
 *       {
 *           "id": 1,
 *           "teachingLoadCreds": 6;
 *       }
 *     ]
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */
router.post('/consultationHours/', async (req, res) => {
  try {
    await Ctrl.addConsultationHours(req.body);
    //const teachingLoad = await Ctrl.getTeachingLoad(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created consultation hours details',
      //data: teachingLoad
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /teachingLoad updateTeachingLoad
 * @apiGroup Teaching Load
 * @apiName updateTeachingLoad
 *
 * @apiParam (Body Params) {Integer} id ID of Teaching Load
 * @apiParam (Body Params) {Integer} teachingLoadCreds teaching load credits of Teaching Load
 *
 * @apiSuccess {Object} teachingLoad Teaching Load updated
 * @apiSuccess {Integer} teachingLoad.id ID of Teaching Load
 * @apiSuccess {Integer} teachingLoad.teachingLoadCreds teaching load credits of Teaching load updated
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully updated teaching load details",
 *     "data": [
 *       {
 *           "id": 1,
 *           "teachingLoadCreds": 6;
 *       }
 *     ]
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 *   HTTP/1.1 404 Teaching Load not found
 *   {
 *     "status": 404,
 *     "message": "Teaching Load details not found"
 *   }
 */
router.put('/consultationHours/:id/:chID', async (req, res) => {
  try {
    await Ctrl.updateConsultationHours(req.params, req.body);
    //const teachingLoad = await Ctrl.getTeachingLoad(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated consultation hours details',
      //data: teachingLoad
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /teachingLoad deleteTeachingLoad
 * @apiGroup Teaching Load
 * @apiName deleteTeachingLoad
 *
 * @apiParam (Body Params) {Integer} id ID of Teaching Load
 * @apiParam (Body Params) {Integer} teachingLoadCreds teaching load credits of Teaching Load
 *
 * @apiSuccess {Object} teachingLoad Teaching Load deleted
 * @apiSuccess {Integer} teachingLoad.id ID of Teaching Load deleted
 * @apiSuccess {Integer} teachingLoad.teachingLoadCreds teaching load credits of Teaching load deleted
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully deleted teaching load details"
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 *   HTTP/1.1 404 Teaching Load not found
 *   {
 *     "status": 404,
 *     "message": "Teaching Load details not found"
 *   }
 */

router.delete('/consultationHours/:id', async (req, res) => {
  try {
    await Ctrl.deleteConsultationHours(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted consultation hours details',
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /teachingLoad getTeachingLoad
 * @apiGroup Teaching Load
 * @apiName getTeachingLoad
 *
 * @apiParam (Body Params) {Integer} id ID of Teaching Load
 * @apiParam (Body Params) {Integer} teachingLoadCreds teaching load credits of Teaching Load
 *
 * @apiSuccess {Object} teachingLoad Teaching Load fetched
 * @apiSuccess {Integer} teachingLoad.id ID of Teaching Load fetched
 * @apiSuccess {Integer} teachingLoad.teachingLoadCreds teaching load credits of Teaching load fetched
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched teaching load details",
 *     "data": [
 *       {
 *           "id": 1,
 *           "teachingLoadCreds": 6;
 *       }
 *     ]
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 *   HTTP/1.1 404 Teaching Load not found
 *   {
 *     "status": 404,
 *     "message": "Teaching Load details not found"
 *   }
 */

router.get('/consultationHoursOfFSR/:id', async (req, res) => {
  try {
    const consultationHoursOfFSR = await Ctrl.getAllConsultationHoursOfFSR(
      req.params,
    );

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched consultation hours details',
      data: consultationHoursOfFSR,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/*
  * @api {get} /teachingLoad getAllTeachingLoad
 * @apiGroup Teaching Load
 * @apiName getAllTeachingLoad
 *
 * @apiParam (Body Params) {Integer} id ID of Teaching Load
 * @apiParam (Body Params) {Integer} teachingLoadCreds teaching load credits of Teaching Load
 *
 * @apiSuccess {Object[]} teachingLoads All Teaching Loads fetched
 * @apiSuccess {Integer} teachingLoad.id ID of Teaching Load fetched
 * @apiSuccess {Integer} teachingLoad.teachingLoadCreds teaching load credits of Teaching load fetched
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched teaching load details",
 *     "data": [
 *       {
 *           "id": 1,
 *           "teachingLoadCreds": 6;
 *       },
 *       {
 *           "id": 2,
 *           "teachingLoadCreds": 9;
 *       }
 *     ]
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 *   HTTP/1.1 404 Teaching Load not found
 *   {
 *     "status": 404,
 *     "message": "Teaching Load details not found"
 *   }
 */

router.get('/consultationHours/', async (req, res) => {
  try {
    const consultationHours = await Ctrl.getAllConsultationHours(req.query);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched consultation hours details',
      data: consultationHours,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.post('/chTimeslot/', async (req, res) => {
  try {
    await Ctrl.addTimeslot(req.body);
    //const teachingLoad = await Ctrl.getTeachingLoad(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created time slot details',
      //data: teachingLoad
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.put('/chTimeslot/:id/:chID', async (req, res) => {
  try {
    await Ctrl.updateTimeslot(req.params, req.body);
    //const teachingLoad = await Ctrl.getTeachingLoad(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated consultation hours details',
      //data: teachingLoad
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.delete('/chTimeslot/:id/:chID/:day/:time', async (req, res) => {
  try {
    await Ctrl.deleteTimeslot(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted consultation hours details',
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
