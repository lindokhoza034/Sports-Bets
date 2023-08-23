import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bet, GameQuestionOption } from 'src/app/interfaces/sports-listing';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BetAndSlipManagerService } from 'src/app/services/bet-and-slip-manager/bet-and-slip-manager.service';
import { LoadSportsGuard } from 'src/app/services/load-sports/load-sports.guard';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
declare const Notiflix: any, $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showMyBets: boolean = false;
  totalOdds: number = 0;
  showType: string = 'live';
  minimum_bet: number = 0;
  currency: string = 'ZAR';
  win_charge: number = 0;
  return_amount?: string;
  get myBets() {
    return this.betAndSlipManager.bets;
  }
  get betSlip() {
    return this.betAndSlipManager.slip;
  };
  formAmount: string;
  constructor(private router: Router,private betAndSlipManager: BetAndSlipManagerService, private authentication: AuthenticationService, private transactions: TransactionService, public sports: LoadSportsGuard) {
    this.formAmount = '';
    this.getSlip();
    this.getMybets();
  }
  ngAfterContentInit(): void {
    $(".skitter-large").skitter({
      dots: false,
      interval: 3000,
      stop_over: false,
    });
  }


  liveUpComing(type: string) {
    localStorage.setItem("showType", type);
    this.showType = type;
  }

  addToSlip(data: GameQuestionOption) {
    if (data.is_unlock_question == 1 || data.is_unlock_match == 1) {
      return;
    }
    const index = this.betSlip.findIndex(
      (object) => object.match_id === data.match_id
    );
    if (index === -1) {
      this.betSlip.push(data);
      Notiflix.Notify.Success("Added to Bet slip");
    } else {
      var result = this.betSlip.map(function (obj) {
        if (obj.match_id == data.match_id) {
          obj = data;
        }
        return obj;
      });
      this.betAndSlipManager.slip = result;

      Notiflix.Notify.Info("Bet slip has been updated");
    }
    this.totalOdds = this.oddsCalc(this.betSlip);
    localStorage.setItem("newBetSlip", JSON.stringify(this.betSlip));
  }
  getSlip() {
    var strData = localStorage.getItem("newBetSlip");
    var selectData = strData ? JSON.parse(strData) : null;
    if (selectData != null) {
      this.betAndSlipManager.slip = selectData;
    } else {
      this.betAndSlipManager.slip = [];
    }
    this.totalOdds = this.oddsCalc(this.betSlip);
  }
  getMybets() {
    var strData = localStorage.getItem("myBets");
    var selectData = strData ? JSON.parse(strData) : null;
    if (selectData != null) {
      this.betAndSlipManager.bets = selectData;
    } else {
      this.betAndSlipManager.bets = [];
    }
  }

  removeItem(obj: GameQuestionOption) {
    this.betSlip.splice(this.betSlip.indexOf(obj), 1);
    this.totalOdds = this.oddsCalc(this.betSlip);

    var selectData: GameQuestionOption[] = JSON.parse(localStorage.getItem("newBetSlip") ?? '');
    var storeIds = selectData.filter(function (item) {
      if (item.id === obj.id) {
        return false;
      }
      return true;
    });
    localStorage.setItem("newBetSlip", JSON.stringify(storeIds));
  }

  oddsCalc(obj: GameQuestionOption[]) {
    var ratio = 1;
    for (var item of obj) {
      ratio *= item.ratio;
    }
    return ratio;
  }

  decrement() {
    let f_val = parseFloat(this.formAmount ?? '0');
    if (isNaN(f_val)) {
      f_val = 0
    } else if (f_val < 0) {
      f_val = 0;
    }
    f_val--;
    this.formAmount = f_val.toString();
    this.return_amount = (f_val * this.totalOdds).toFixed(2);
  }
  increment() {
    let f_val = parseFloat(this.formAmount ?? '0');
    if (isNaN(f_val)) {
      f_val = 0
    } else if (f_val < 0) {
      f_val = 0;
    }
    f_val++;
    this.formAmount = f_val.toString();
    this.return_amount = (f_val * this.totalOdds).toFixed(2);
  }
  calc(val: string) {
    let f_val = parseFloat(val ?? '0');

    if (isNaN(f_val)) {
      f_val = 0
    } else if (f_val < 0) {
      f_val = 0;
    }
    this.return_amount = (f_val * this.totalOdds).toFixed(2);
  }
  calcReturnAmount(amount: string, slip: GameQuestionOption[]) {
    let f_val = parseFloat(amount ?? '0');

    if (isNaN(f_val)) {
      f_val = 0
    } else if (f_val < 0) {
      f_val = 0;
    }

    return (f_val * this.oddsCalc(slip)).toFixed(2);
  }
  goMatch(item: any) {
    // var $url = "/match/:match_name/:match_id";
    // $url = $url.replace(":match_name", item.slug);
    // $url = $url.replace(":match_id", item.id);
    // window.location.href = $url;
  }

  getEvents() {
    // let _this = this;
    // // Pusher.logToConsole = true;
    // let pusher = new Pusher("1c6cc9b6da8d4322c22e", {
    //   encrypted: true,
    //   cluster: "ap2",
    // });
    // var channel = pusher.subscribe("match-notification");

    // channel.bind("App\\Events\\MatchNotification", function (data) {
    //   console.log(data);
    //   if (data && data.type == "Edit") {
    //     _this.updateEventData(data);
    //   } else if (data && data.type != "Edit") {
    //     _this.enlistedEventData(data);
    //   }
    // });
  }
  updateEventData(data: any) {
    // var _this = this;
    // var list = _this.allSports_filter;
    // const result = list.map(function (obj) {
    //   if (obj.id == data.match.id) {
    //     obj = data.match;
    //   }
    //   return obj;
    // });
    // _this.allSports_filter = result;

    // var list2 = _this.upcoming_filter;

    // const upcomingResult = list2.map(function (obj) {
    //   if (obj.id == data.match.id) {
    //     obj = data.match;
    //   }
    //   return obj;
    // });

    // _this.upcoming_filter = upcomingResult;
  }
  enlistedEventData(data: any) {
    // var _this = this;
    // if (data && data.type == "Enlisted") {
    //   var list = _this.allSports_filter;
    //   list.push(data.match);
    // }
    // if (data && data.type == "UpcomingList") {
    //   var upcomingList = _this.upcoming_filter;
    //   upcomingList.push(data.match);
    // }
  }
  betPlace() {
    if (!this.authentication.currentUser) {
      this.router.navigateByUrl("/login");
      return;
    }
    if (this.betSlip.length == 0) {
      Notiflix.Notify.Failure("Please make a bet slip");
      return;
    }
    if (this.formAmount == "") {
      Notiflix.Notify.Failure("Please put a amount");
      return;
    }
    const amount = parseFloat(this.formAmount);

    if (amount <= 0 || isNaN(amount)) {
      Notiflix.Notify.Failure("Please put a valid amount");
      return;
    }


    if (this.minimum_bet > parseFloat(this.formAmount)) {
      Notiflix.Notify.Failure(
        "Minimum Bet " + this.minimum_bet + " " + this.currency
      );
      return;
    }
    if (amount > this.transactions.balance) {
      Notiflix.Notify.Failure("You have insufficient credit to place a Bet.");
      return;
    }
    const strMyBets = localStorage.getItem('myBets');
    if (strMyBets) {
      this.betAndSlipManager.bets = JSON.parse(strMyBets) ?? [];
    }
    this.myBets.push({
      amount: this.formAmount,
      slip: this.betSlip
    });
    this.transactions.addTransaction(this.authentication.currentUser.username, -amount);
    localStorage.setItem('myBets', JSON.stringify(this.myBets));

    this.betAndSlipManager.slip = [];
    localStorage.removeItem('newBetSlip');
    Notiflix.Report.Success("Successful", "Your bet has been placed successfully. Your total Bet about is R" + amount.toFixed(2), 'Okay');
    //TODO: place bet
  }

  getDifference(array1: any, array2: any) {
    // return array1.filter((object1) => {
    //   return !array2.some((object2) => {
    //     return object1.id === object2.id;
    //   });
    // });
  }
  slicedArray(items: any) {
    // return Object.values(items)[0];
  }

  take3Questions(items: any[]) {
    return items.length <= 3 ? items : items.slice(0, 3);
  }
  MoreThan3Question(items: any[]) {
    return items.length > 3 ? items : [];
  }
  toggleSidebar(id: string) {
    const element = document.getElementById(id);
    element?.classList?.toggle("active");
  }

  emptyArray(count: number) {
    if (count <= 0) {
      return [];
    }
    return Array.apply(1, Array(count)).map((_, _i) => _i + 1);
  }
}
