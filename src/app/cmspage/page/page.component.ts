import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  title = 'About Us';

  constructor(
    
    private titleservice: Title,
    private metaservice: Meta

  ) { }

  ngOnInit(): void {

    this.titleservice.setTitle(this.title)
  }

}
