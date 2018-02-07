import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BunnyImage } from 'bunnyjs/src/file/image';

@Injectable()
export class ImgToBase64Service {
  converted = new Subject();

  constructor() {}

  convert(data) {
    let image: any;
    let resImg: string;

    BunnyImage.IMG_CONVERT_TYPE = this.checkType(data);

    if ( typeof data !== 'string' ) {
      let img = document.createElement("img");
      image = window.URL.createObjectURL(data);
    } else {
      image = data;
    }

    BunnyImage.getImage(image).then(image => {
      return image;
    }).then(image => {
      resImg = BunnyImage.imageToBase64(image);
      this.converted.next(resImg);
    });
  }

  checkType(img) {
    let mimeType;
    if ( typeof img === 'string' ) {
      if ( img.match(/\.(png)$/) != null ) {
        mimeType = 'image/png'
      } else if ( img.match(/\.(gif)$/) != null ) {
        mimeType = 'image/gif'
      } else if ( img.match(/\.(jpg)$/) != null ) {
        mimeType = 'image/jpg'
      } else {
        mimeType = 'image/png'
      }
    } else {
      mimeType = img.type;
    }

    return mimeType;
  }
}
