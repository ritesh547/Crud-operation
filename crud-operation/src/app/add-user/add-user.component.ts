import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: any = []
  userId: any | undefined;
  submitted: boolean = false;
  constructor(
    private userServices: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formInIt();
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userServices.getUserById(this.userId).subscribe((res: any) => {
        this.userForm.setValue({
          name: res.name,
          age: res.age,
          city: res.city
        });
      })
    }
  }

  private formInIt() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      city: ['', Validators.required],
    })
  }
  get f() {
    return this.userForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return
    } else {
      if (this.userId == null) {
        debugger
        this.userServices.addUser(this.userForm.value).subscribe((res: any) => {
          this.router.navigate(['']);
        })
      } else {
        this.userServices.updateUser(this.userId, this.userForm.value).subscribe((res: any) => {
          this.router.navigate(['']);
        })
      }

    }
  }

}
