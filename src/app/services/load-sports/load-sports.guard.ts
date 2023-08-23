import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { SportsListing } from 'src/app/interfaces/sports-listing';

@Injectable({
  providedIn: 'root'
})
export class LoadSportsGuard  {
  private _sports?: SportsListing;
  private _filtered_sports?: SportsListing;
  get filtered_sports():SportsListing{
    return this._filtered_sports ?? {
      liveList:[],
      upcomingList:[]
    };
  }
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) { }
  
  async loadSports(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this._sports ??= await lastValueFrom(this.http.get<SportsListing>(`assets/api/allSports.json`));
    this._filtered_sports = this._sports;
    console.log(route.params);
      if (route.params['category_id']) {
        this.filterByCategory(parseInt(route.params['category_id']));
      }
      if (route.params['tournament_id']) {
        this.filterByTournament(parseInt(route.params['tournament_id']));
      }
    return true;
  }

  filterByCategory(category_id: number) {
    this._filtered_sports = {
      liveList: this._filtered_sports?.liveList?.filter(_ => _.category_id === category_id) ?? [],
      upcomingList: this._filtered_sports?.upcomingList?.filter(_ => _.category_id === category_id) ?? []
    }
  }

  filterByTournament(tournament_id: number) {
    this._filtered_sports = {
      liveList: this._filtered_sports?.liveList?.filter(_ => _.tournament_id === tournament_id) ?? [],
      upcomingList: this._filtered_sports?.upcomingList?.filter(_ => _.tournament_id === tournament_id) ?? []
    }
  }
}
