import { Observable } from 'rxjs/Rx';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { User } from '../_models/User';
import 'rxjs/add/operator/catch';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MemberEditResolver implements Resolve<User> {
  
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService

  ){}

  resolve(route: ActivatedRouteSnapshot ):Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid)
    .catch(error =>{
      this.alertify.error('problem resolving data');
      this.router.navigate(['/members']);
      return Observable.of(null);
    })
  }

}
