import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperConfig } from 'ngx-swiper-wrapper';
import { SiderComponent } from '../sider/sider.component';




@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [SiderComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  userName: string = '';
  constructor(private authService: AuthService) { }

   swiperConfig = {
    speed: 600,
    parallax: true,
    pagination: { clickable: true },
    navigation: true
  };

  slides = [
    {
      title: 'Slide 1',
      subtitle: 'Subtitle',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
      dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
      laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
      Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
      Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
      ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
      tincidunt ut libero. Aenean feugiat non eros quis feugiat.`
    },
    {
      title: 'Slide 2',
      subtitle: 'Subtitle',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
      dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
      laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
      Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
      Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
      ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
      tincidunt ut libero. Aenean feugiat non eros quis feugiat.`
    },
    {
      title: 'Slide 3',
      subtitle: 'Subtitle',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
      dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
      laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
      Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
      Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
      ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
      tincidunt ut libero. Aenean feugiat non eros quis feugiat.`
    }
  ];



  ngOnInit() {
    const userName = this.authService.getUserName();
    if (userName) {
      console.log('nome' + userName);
      this.userName = userName;
    }
  }






}
