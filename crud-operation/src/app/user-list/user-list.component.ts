import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: any = [];
  constructor(
    private userServices: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList() {
    this.userServices.getUserList().subscribe((res: any) => {
      this.userList = res;
      console.log('user', this.userList);
    })
  }

  public onEdit(item: any) {
    console.log('edit', item);
    this.router.navigate(['/add-user', item.id])
  }
 
  public onDelete(item: any) {
    console.log('remove', item);
    this.userServices.removeUser(item.id).subscribe((res: any) => {
      this.router.navigate(['']);
      this.getUserList();
    })
  }
}
