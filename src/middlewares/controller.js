import db from '../database/index';
import * as Query from './queries';

export const getUserIDofFSR = (id, userID) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getUserIDofFSR, { id }, (err, results) => {
      if (err) return reject(500);
      if (results.length == 0) return reject(404);
      else if (results[0].userID == userID) return resolve(results[0].userID);
      else return reject(403);
    });
  });
};

export const getIDofFSRfromAdminWork = adminWorkID => {
  return new Promise((resolve, reject) => {
    db.query(Query.getIDofFSRfromAdminWork, { adminWorkID }, (err, results) => {
      if (err) return reject(500);
      if (results.length != 0) return resolve(results[0].id);
      return reject(404);
    });
  });
};

export const getIDofFSRfromAward = awardID => {
  return new Promise((resolve, reject) => {
    db.query(Query.getIDofFSRfromAward, { awardID }, (err, results) => {
      if (err) return reject(500);
      if (results.length != 0) return resolve(results[0].id);
      return reject(404);
    });
  });
};

export const getIDofFSRfromConsultationHours = chID => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getIDofFSRfromConsultationHours,
      { chID },
      (err, results) => {
        if (err) return reject(500);
        if (results.length != 0) return resolve(results[0].id);
        return reject(404);
      },
    );
  });
};

export const getIDofFSRfromCourse = (courseID, userID) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getIDofFSRfromCourse, { courseID }, (err, results) => {
      if (err) return reject(500);
      if (results.length != 0) return resolve(results[0].id);
      return reject(404);
    });
  });
};

export const getIDofFSRfromCourseSched = (courseSchedID, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getIDofFSRfromCourseSched,
      { courseSchedID },
      (err, results) => {
        if (err) return reject(500);
        if (results.length != 0) return resolve(results[0].id);
        return reject(404);
      },
    );
  });
};

export const getIDofFSRfromSubject = (subjectID, userID) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getIDofFSRfromSubject, { subjectID }, (err, results) => {
      if (err) return reject(500);
      if (results.length != 0) return resolve(results[0].id);
      return reject(404);
    });
  });
};

export const getIDofFSRfromTimeslot = (timeslotID, userID) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getIDofFSRfromTimeslot, { timeslotID }, (err, results) => {
      if (err) return reject(500);
      if (results.length != 0) return resolve(results[0].id);
      return reject(404);
    });
  });
};

export const getIDofFSRfromResearch = researchID => {
  return new Promise((resolve, reject) => {
    db.query(Query.getIDofFSRfromResearch, { researchID }, (err, results) => {
      if (err) return reject(500);
      if (results.length != 0) return resolve(results[0].id);
      return reject(404);
    });
  });
};

export const getIDofFSRfromRCoAuth = (rCoAuthorID, userID) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getIDofFSRfromRCoAuth, { rCoAuthorID }, (err, results) => {
      if (err) return reject(500);
      if (results.length != 0) return resolve(results[0].id);
      return reject(404);
    });
  });
};

export const getIDofFSRfromCreativeWork = creativeWorkID => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getIDofFSRfromCreativeWork,
      { creativeWorkID },
      (err, results) => {
        if (err) return reject(500);
        if (results.length != 0) return resolve(results[0].id);
        return reject(404);
      },
    );
  });
};

export const getIDofFSRfromCWorkCoAuth = cworkCoAuthorID => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getIDofFSRfromCWorkCoAuth,
      { cworkCoAuthorID },
      (err, results) => {
        if (err) return reject(500);
        if (results.length != 0) return resolve(results[0].id);
        return reject(404);
      },
    );
  });
};

export const getIDofFSRfromService = extAndCommServiceID => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getIDofFSRfromService,
      { extAndCommServiceID },
      (err, results) => {
        if (err) return reject(500);
        if (results.length != 0) return resolve(results[0].id);
        return reject(404);
      },
    );
  });
};

export const getReceiverIDofNotification = (notificationID, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getReceiverIDofNotification,
      { notificationID },
      (err, results) => {
        if (err) return reject(500);
        if (results.length == 0) return reject(404);
        else if (results[0].receiverID == userID)
          return resolve(results[0].userID);
        else return reject(403);
      },
    );
  });
};
