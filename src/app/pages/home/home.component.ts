import { AfterViewInit, Component, OnInit } from '@angular/core';

import { BunnyImage } from 'bunnyjs/src/file/image';
import { ImgToBase64Service } from '../../shared/_services/img-to-base64.service';
import { GetLogoService } from '../../shared/_services/get-logo.service';
import { LoaderService } from '../../components/loader/loader.service';
import { NotificationService } from '../../shared/_services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ImgToBase64Service, GetLogoService]
})
export class HomeComponent implements OnInit, AfterViewInit {
  file_src: string;
  newImg: string;
  imagesArray = [];
  loader;

  constructor(
    private imgToBase64: ImgToBase64Service,
    private getLogo: GetLogoService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.file_src = "https://www.google.com.ua/favicon.ico";
  }

  ngOnInit() {
    this.imgToBase64.converted
      .subscribe(
        (data: string) => {
          this.newImg = data;
        }
      );
    this.getLogo.loaded
      .subscribe(
        (data: any) => {
          if ( data instanceof Array ) {
            data.forEach((img) => {
              this.imagesArray.push(img);
            });
          } else {
            this.imgToBase64.convert(data.url);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );

    // this.getLogo.getSiteLogoArray('http://www.deezer.com/', 6);
    // this.getLogo.getSiteLogo('google.com');
  }

  ngAfterViewInit() {
    // this.loader = this.loaderService.create({
    //   id: 'home'
    // });
    //
    // this.loader.present().subscribe(() =>{
    //   setTimeout(() => {
    //     this.loader.dismiss();
    //   }, 1000)
    // });
  }

  loaderOpen(id: string, text: string) {
    if ( text ) {
      this.loader = this.loaderService.create({
        id: id,
        content: text
      });
    } else {
      this.loader = this.loaderService.create({
        id: id
      });
    }
    this.loader.present().subscribe(() =>{
      setTimeout(() => {
        this.loader.dismiss();
      },1000)
    });
  }

  imageChange(input) {
    this.imgToBase64.convert(input.target.files[0]);
  }

  createSuccessNotification(message = '', timeout) {
    this.notificationService.success(message, timeout);
  }
  createErrorNotification(message = '') {
    this.notificationService.error(message);
  }
  createInfoNotification(message = '') {
    this.notificationService.info(message);
  }
  createWarningNotification(message = '') {
    this.notificationService.warn(message);
  }
  clearNotification() {
    this.notificationService.clear();
  }
}
