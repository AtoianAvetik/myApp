import { AfterViewInit, Component, OnInit } from '@angular/core';

import { BunnyImage } from 'bunnyjs/src/file/image';
import { ImgToBase64Service } from '../../_services/img-to-base64.service';
import { GetLogoService } from '../../_services/get-logo.service';
import { LoaderService } from '../../_services/loader.service';

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
    private LoaderService: LoaderService) {
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
    // this.loader = this.LoaderService.create({
    //   id: 'home'
    // });
    //
    // this.loader.present().subscribe(() =>{
    //   setTimeout(() => {
    //     this.loader.dismiss();
    //   }, 1000)
    // });
  }

  loaderOpen(id: string) {
    this.loader = this.LoaderService.create({
      id: id,
      content: id
    });

    this.loader.present().subscribe(() =>{
      setTimeout(() => {
        this.loader.dismiss();
      },1000)
    });
  }

  imageChange(input) {
    this.imgToBase64.convert(input.target.files[0]);
  }
}
