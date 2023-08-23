import { Injectable } from '@angular/core';

interface Transaction {
  amount: number;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: Transaction[] = [];
  get balance() {
    const data = localStorage.getItem('transactions');
    if (data) {
      this.transactions = JSON.parse(data) ?? [];
    }
    return this.transactions.reduce((t, v) => t += v.amount, 0);
  }

  addTransaction(username: string, amount: number) {
    this.transactions.push({
      amount,
      username
    });
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
  clearTransctions() {
    this.transactions = [];
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
}
