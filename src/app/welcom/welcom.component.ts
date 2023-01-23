import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcom',
  templateUrl: './welcom.component.html',
  styleUrls: ['./welcom.component.css']
})
export class WelcomComponent implements OnInit {
  user: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
}
