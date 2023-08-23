import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { BetAndSlipManagerService } from '../bet-and-slip-manager/bet-and-slip-manager.service';
import { TransactionService } from '../transaction/transaction.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _users: User[] = [];
  private get users() {
    if (this._users.length === 0) {
      const us = localStorage.getItem('users');
      if (us) {
        this._users = JSON.parse(us) ?? [];
      }
    }
    return this._users;
  }

  private _currentUser?: User;
  get currentUser() {
    if (!this._currentUser) {
      const u = localStorage.getItem('currentUser');
      if (u) {
        this._currentUser = JSON.parse(u);
      }
    }
    return this._currentUser;
  }
  constructor(private betAndSlip: BetAndSlipManagerService,private transactions:TransactionService) { }


  login(username: string, password: string): boolean {
    const user = this.users.filter(_ => _.username.toLowerCase().trim() === username.trim().toLowerCase() && _.password === password).pop();
    if (user) {
      this._currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.betAndSlip.clear();
    this.transactions.clearTransctions();
    this._currentUser = undefined;
  }
  register(user: User) {
    if (user) {
      if (this.users.some(_ => _.username.trim().toLowerCase() === user.username.trim().toLowerCase())) {
        return "Username already exist";
      }

      if (this.users.some(_ => _.email.trim().toLowerCase() === user.email.trim().toLowerCase())) {
        return "Email already exist";
      }
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
      return '';
    }
    return 'Empty user details cannot be saved';
  }
}
