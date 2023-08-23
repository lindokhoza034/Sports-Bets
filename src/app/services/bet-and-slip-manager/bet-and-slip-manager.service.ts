import { Injectable } from '@angular/core';
import { Bet, GameQuestionOption } from 'src/app/interfaces/sports-listing';

@Injectable({
  providedIn: 'root'
})
export class BetAndSlipManagerService {
  slip: GameQuestionOption[] = [];
  bets: Bet[] = [];

  clear() {
    this.slip = [];
    this.bets = [];
    localStorage.removeItem('newBetSlip');
    localStorage.removeItem('myBets');
  }
}
