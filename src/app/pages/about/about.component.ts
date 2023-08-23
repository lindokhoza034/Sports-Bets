import { AfterContentInit, Component } from '@angular/core';
declare const $:any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    $(".testimonials").owlCarousel({
      loop: true,
      margin: 25,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: {
          0: {
              items: 1,
          },
          768: {
              items: 2,
          },
          992: {
              items: 3,
          },
      },
  });
  }
 
}
