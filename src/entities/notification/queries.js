import { formatQueryParams } from '../../utils';

export const getNotification = `
	SELECT * FROM notification
	WHERE notificationID = :notificationID
`;

export const getNotifications = (query, sortBy) => `
	SELECT * FROM notification ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
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

export const getTotalNotifications = query => `
  SELECT count(*) as total FROM notification ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
