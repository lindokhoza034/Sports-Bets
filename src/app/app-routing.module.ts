import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResultsComponent } from './pages/results/results.component';
import { TermsComponent } from './pages/terms/terms.component';
import { LoadSportsGuard } from './services/load-sports/load-sports.guard';

const routes: Routes = [
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "deposit",
    component: DepositComponent
  },
  {
    path: "result",
    component: ResultsComponent
  },
  {
    path: "faq",
    component: FaqComponent
  },
  {
    path: "blog",
    component: BlogComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "terms",
    component: TermsComponent
  },
  {
    path: "policy",
    component: PolicyComponent
  },
  {
    path: ":category_id/:tournament_id",
    component: HomeComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(LoadSportsGuard).loadSports(route, state)]
  },
  {
    path: ":category_id",
    component: HomeComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(LoadSportsGuard).loadSports(route, state)]
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(LoadSportsGuard).loadSports(route, state)]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
