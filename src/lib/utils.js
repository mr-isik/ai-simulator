import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

export function cn(...args) {
  return twMerge(classNames(...args));
}
