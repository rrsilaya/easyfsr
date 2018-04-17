import { formatQueryParams } from '../../utils';

export const getLog = `
  SELECT * FROM log 
  WHERE id = :id
`;

export const getLogs = (query, sortBy) => `
  SELECT * FROM log ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit 
  OFFSET :offset
`;

export const getTotalLogs = query => `
  SELECT COUNT(*) as total FROM log ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
`;

export const addLog = ` 
  CALL log(:action,:changes,:affectedID,:userID);
`;
