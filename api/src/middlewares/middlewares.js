import { getUserIDofFSR } from './controller';

// Constants
const ADMIN = 'ADMIN';
const USER = 'USER';

export const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  res.status(401).json({
    status: 401,
    message: 'You must be logged in',
  });
};

export const isAdmin = (req, res, next) => {
  if (req.session.user.acctType === ADMIN) {
    return next();
  }

  res.status(403).json({
    status: 403,
    message: 'You must be an administrator to perform that action',
  });
};

export const isHead = (req, res, next) => {
  const { user } = req.session;

  if (user.isHead || user.acctType === ADMIN) {
    return next();
  }

  res.status(403).json({
    status: 403,
    message: 'You must have an elevated access to perform that action',
  });
};

export const isEmployeeAuthorized = attribute => (req, res, next) => {
  const { user } = req.session;

  if (user[attribute] == req.params[attribute] || user.acctType === ADMIN) {
    return next();
  }

  res.status(403).json({
    status: 403,
    message: 'You must have an elevated access to perform that action',
  });
};

export const isNotSameUser = attribute => (req, res, next) => {
  const { user } = req.session;

  if (user[attribute] != req.params[attribute]) {
    return next();
  }

  res.status(400).json({
    status: 400,
    message: 'You must not perform that action with user',
  });
};

export const canModifyFSR = async (req, res, next) => {
  const { userID, acctType } = req.session.user;

  if (acctType === ADMIN) return next();

  try {
    await getUserIDofFSR(req.params.id, userID);
    return next();
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'You must have an elevated access to perform that action';
        break;
      case 404:
        message = 'FSR not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
};

export const canViewFSR = async (req, res, next) => {
  const { userID, acctType, isHead } = req.session.user;

  if (isHead || acctType === ADMIN) return next();

  try {
    await getUserIDofFSR(req.params.id, userID);
    return next();
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'You must have an elevated access to perform that action';
        break;
      case 404:
        message = 'FSR not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
};

export const userGetAll = (req, res, next) => {
  const { userID, acctType } = req.session.user;
  if (acctType === USER) req.query.userID = userID;
  return next();
};
