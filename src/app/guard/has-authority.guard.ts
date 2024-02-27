import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {tap} from "rxjs";

export const hasAuthorityGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isHasAuthority(route.data['roles']).pipe(
    tap(hasAuthority => {
      if (!hasAuthority) {
        console.error('Unauthorized access to this route');
        router.navigate(['/forbidden']);
      }
    })
  );
};
