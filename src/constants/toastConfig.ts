import { successIcon, errorIcon, infoIcon, warningIcon } from './icons';

const toastConfig = {
  success: {
    icon: successIcon,
    backgroundColor: '#28a745',
    borderColor: '#1e7e34',
  },
  error: {
    icon: errorIcon,
    backgroundColor: '#dc3545',
    borderColor: '#b02a37',
  },
  info: {
    icon: infoIcon,
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  warning: {
    icon: warningIcon,
    backgroundColor: '#ff8500',
    borderColor: '#cc6d00',
  },
  default: {
    icon: infoIcon,
    backgroundColor: '#4a4a4a',
    borderColor: '#2e2e2e',
  },
};

export default toastConfig;
