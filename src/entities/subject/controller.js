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
    const {
      subjectCode,
      teachingLoadCreds,
      noOfStudents,
      sectionCode,
      hoursPerWeek,
    } = subject;

    const grad = new RegExp('[234][0-9]{2}D*');
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
    if (!grad.test(subjectCode)) {
      TLCM =
        noOfStudents <= 40
          ? TLC
          : noOfStudents > 160
            ? TLC * 2
            : TLC * ((noOfStudents - 40) / 120 + 1);
    } else if (sp1.test(subjectCode) || sp2.test(subjectCode))
      TLCM = noOfStudents / 2 * TLC * 3;

    it.test(subjectCode) ? (TLCM = TLCM * 1.33) : TLCM;

    subject.courseCred = courseCred;
    subject.studCredUnits = studCredUnits;
    subject.TLC = TLC;
    subject.TLCM = TLCM;
    return resolve(subject);
  });
};

export const getSubjects = subject => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getSubjects(filtered(subject, subjectAttributes), subject.sortBy),
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

export const getTotalSubjects = subject => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalSubjects(filtered(subject, subjectAttributes)),
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
      console.log(err);
      if (err) return reject(500);
      return resolve(results);
    });
  });
};
