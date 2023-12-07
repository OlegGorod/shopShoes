import {toast} from 'react-toastify';

export enum IStatuses {
  info = 'info',
  error = 'error',
  success = 'success',
  warning = 'warning',
}

export default function ToastifyCaller(status: IStatuses, message: string) {
  return toast[status](message, {
    hideProgressBar: false,
    position: 'top-right',
    progress: undefined,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 5000,
    theme: 'light',
  });
}
