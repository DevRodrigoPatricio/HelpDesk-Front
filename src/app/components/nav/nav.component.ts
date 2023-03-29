import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(private router :Router, private authservice :AuthService , private toast: ToastrService) {}

  ngOnInit(): void {
      this.router.navigate(['tecnicos'])
  }

  logout(){
    this.router.navigate(['login'])
    this.authservice.logout()
    this.toast.info('Logout realizado com sucesso.', 'logout',{timeOut: 7000})
  }
}
