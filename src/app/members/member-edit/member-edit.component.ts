import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router'
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from "@angular/forms";
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  @ViewChild('editFrom') editFrom : NgForm;
  photoUrl: string;

  constructor(
    private route: ActivatedRoute, 
    private alertify:  AlertifyService, 
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser(){
    //console.log(this.user);
    
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success("profile updated");
      this.editFrom.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
    
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
