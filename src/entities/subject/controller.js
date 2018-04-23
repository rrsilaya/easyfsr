import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const subjectAttributes = [
  'id',
  'subjectCode',
  'teachingLoadCreds',
  'noOfStudents',
  'sectionCode',
  'room',
];

const searchFields = [
  'subjectCode',
  'teachingLoadCreds',
  'noOfStudents',
  'hoursPerWeek',
  'sectionCode',
  'room',
];

export const addSubject = subject => {
  return new Promise((resolve, reject) => {
    db.query(Query.addSubject, subject, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateSubject = ({ subjectID }, subject) => {
  return new Promise((resolve, reject) => {
    if (!subject) return reject(500);
    db.query(
      Query.updateSubject(filtered(subject, subjectAttributes)),
      { subjectID, ...subject },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.subjectID);
      },
    );
  });
};

export const deleteSubject = ({ subjectID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteSubject, { subjectID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve(results.insertId);
    });
  });
};

export const getSubject = ({ subjectID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getSubject, { subjectID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const computeSubject = subject => {
  return new Promise((resolve, reject) => {
    let {
      subjectCode,
      teachingLoadCreds,
      noOfStudents,
      sectionCode,
      hoursPerWeek,
    } = subject;

    const grad = new RegExp('[2-9][0-9]{2}D*');
    const cmsc200 = new RegExp('200');
    const lab = new RegExp('.+L');
    const sp1 = new RegExp('CMSCs*190s*-s*1');
    const sp2 = new RegExp('CMSCs*190s*-s*2');
    const it = new RegExp('ITs*1D*');

    const courseCred = lab.test(sectionCode) ? 1 : hoursPerWeek;

    const studCredUnits = noOfStudents * courseCred;

    const TLC = lab.test(sectionCode)
      ? 1.5
      : sp1.test(subjectCode) ? 1 : sp2.test(subjectCode) ? 2 : hoursPerWeek;

    let TLCM = 0;
    if (
      (!grad.test(subjectCode) || cmsc200.test(subjectCode)) &&
      !(sp1.test(subjectCode) || sp2.test(subjectCode))
    ) {
      TLCM =
        noOfStudents <= 40
          ? TLC
          : noOfStudents > 160
            ? TLC * 2
            : TLC * ((noOfStudents - 40) / 120 + 1);
    } else if (sp1.test(subjectCode) || sp2.test(subjectCode)) {
      TLCM = noOfStudents / 2 * TLC * 3;
    } else if (grad.test(subjectCode) && !cmsc200.test(subjectCode)) {
      TLCM =
        noOfStudents <= 4 ? TLC : noOfStudents > 9 ? TLC * 1.5 : TLC * 1.25;
    }

    it.test(subjectCode) ? (TLCM = TLCM * 1.33) : TLCM;

    subject.courseCred = courseCred.toFixed(2);
    subject.studCredUnits = studCredUnits.toFixed(2);
    subject.TLC = TLC.toFixed(2);
    subject.TLCM = TLCM.toFixed(2);
    return resolve(subject);
  });
};

export const getSubjects = (subject, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getSubjects(
        filtered(subject, subjectAttributes),
        subject.sortBy,
        userID,
      ),
      {
        field: 'subjectCode',
        ...escapeSearch(subject, searchFields, subject.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalSubjects = (subject, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalSubjects(filtered(subject, subjectAttributes), userID),
      {
        field: 'subjectCode',
        ...escapeSearch(subject, searchFields, subject.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};

export const getSubjectsWithTimeslot = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getSubjectsWithTimeslot, { id }, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};

export const addTLC = tlc => {
  return new Promise((resolve, reject) => {
    db.query(Query.addTLC, tlc, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};

export const subTLC = tlc => {
  return new Promise((resolve, reject) => {
    db.query(Query.subTLC, tlc, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};
