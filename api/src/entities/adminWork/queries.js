import { formatQueryParams } from '../../utils';

export const addAdminWork = `
	INSERT INTO adminWork (
		adminWorkID,
		id,
		position,
		officeUnit,
		approvedUnits
	)
	VALUES (
		DEFAULT,
		:id,
		:position,
		:officeUnit,
		:approvedUnits
	)
`;

export const updateAdminWork = adminWork => `
	UPDATE adminWork SET
	${formatQueryParams(adminWork, 'update')}
	WHERE adminWorkID = :adminWorkID
`;

export const deleteAdminWork = `
	DELETE FROM adminWork
	WHERE adminWorkID = :adminWorkID
`;

export const getAdminWorks = (query, sortBy, userID) => `
 SELECT ${
   userID
     ? `
  adminWorkID,
  x.id,
  position,
  officeUnit,
  approvedUnits`
     : `*`
 } FROM adminWork x ${
  userID
    ? `LEFT JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
        query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'}
  LIMIT :limit OFFSET :offset
`;

export const getAdminWork = `
	SELECT * FROM adminWork
	WHERE adminWorkID = :adminWorkID
`;

export const getTotalAdminWorks = (query, userID) => `
	SELECT COUNT(*) as total FROM adminWork x ${
    userID
      ? `WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
