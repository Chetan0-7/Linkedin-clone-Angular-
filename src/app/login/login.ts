import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';

  // 🔹 Forgot password state
  showForgot = false;
  resetUser = '';

  constructor(private router: Router) {}

  login() {
  if (!this.username || !this.password) {
    alert('Please enter username and password');
    return;
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('user', this.username);
  }

  this.router.navigate(['/feed']);
}


  forgotPassword() {
    this.showForgot = true;
  }

  resetPassword() {
    if (!this.resetUser.trim()) {
      alert('Please enter your email or username');
      return;
    }

    alert('Password reset link sent to ' + this.resetUser + ' (simulation)');
    this.resetUser = '';
    this.showForgot = false;
  }
}

