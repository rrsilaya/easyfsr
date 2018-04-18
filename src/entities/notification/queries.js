import { formatQueryParams } from '../../utils';

export const getNotification = `
	SELECT * FROM notification
	WHERE notificationID = :notificationID
`;

export const getNotifications = (query, sortBy, receiverID) => `
	SELECT ${receiverID ? `message, timestamp, priority` : `*`} FROM notification ${
  receiverID
    ? `WHERE receiverID = :receiverID AND isResolved = 0 ${
        query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;

export const updateNotification = notification => `
	UPDATE notification SET
	${formatQueryParams(notification, 'update')}
	WHERE notificationID = :notificationID
`;

export const addNotification = `
	INSERT INTO notification (
		senderID,
		receiverID,
		message,
		timestamp,
		priority
	)
	VALUES (
		:senderID,
		:receiverID,
		:message,
		NOW(),
		:priority
	)
`;

export const deleteNotification = `
	UPDATE notification SET
		isResolved = true
	WHERE notificationID = :notificationID
`;

export const getTotalNotifications = (query, receiverID) => `
  SELECT count(*) as total FROM notification ${
    receiverID
      ? `WHERE receiverID = :receiverID AND isResolved = 0 ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }`;
