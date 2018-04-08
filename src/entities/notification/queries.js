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
		notificationID,
		senderID,
		receiverID,
		message,
		dateSent,
		timeSent,
		isResolved,
		priority
	)
	VALUES (
		:notificationID,
		:senderID,
		:receiverID,
		:message,
		:dateSent,
		:timeSent,
		:isResolved,
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

export const getTotalNotificationsBySender = `
  SELECT count(*) as total FROM limitedPracticeOfProf WHERE senderID = :senderID 
`;

export const getTotalNotificationsByReceiver = `
  SELECT count(*) as total FROM limitedPracticeOfProf WHERE receiverID = :receiverID 
`;
