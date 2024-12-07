import { CanActivateFn } from '@angular/router';

export const authedGuard: CanActivateFn = (route, state) => {
  return true;
};
