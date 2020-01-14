import { BASE_URL as PARENT_URL} from '../Users/constants';

export { PARENT_URL };
export const BASE_URL = `${PARENT_URL}/plan`;
export const allowedRoles = ['owner', 'hr'];
