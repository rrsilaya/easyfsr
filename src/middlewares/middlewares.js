// Constants
const ADMIN = 'ADMIN';

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
