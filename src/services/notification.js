import { notification } from 'antd';

const notificationProps = {
  placement: 'topRight',
  duration: 8,
  style: {
    borderRadius: 5
  }
}

const createNotifier = type => 
  (message, description) => notification[type]({
    message,
    description,
    ...notificationProps
  });

export const info = createNotifier('info');
export const warn = createNotifier('warning');
export const error = createNotifier('error');
export const success = createNotifier('success');
  
export default {
  info,
  warn,
  error,
  success,
}
