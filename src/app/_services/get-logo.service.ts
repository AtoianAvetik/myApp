import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GetLogoService {
  private gAPIKey: string = 'AIzaSyDifvKErkUeRQcPtG6WfAltssW8rkI-Zco';
  private gCSEcx: string = '016820916711928902111:qw0kgpuhihm';
  loaded: Subject<any> = new Subject<any>();

  getSiteLogo(searchTerm) {
    this.getImageUrl(searchTerm + 'logo', false, 1);
  }

  getSiteLogoArray(searchTerm, count = 1) {
    this.getImageUrl(searchTerm + 'logo', true, count);
  }

  getImageUrl(searchTerm, array, count) {
    // Google image search - 100 searches per day.
    // https://developers.google.com/image-search/
    // var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    //   '?v=1.0&q=' + encodeURIComponent(searchTerm);
    let searchUrl = 'https://www.googleapis.com/customsearch/v1' + '?key=' + this.gAPIKey + '&cx=' + this.gCSEcx + '&searchType=image&q=' + encodeURIComponent(searchTerm);

    let x = new XMLHttpRequest();
    x.open('GET', searchUrl);
    // The Google image search API responds with JSON, so let Chrome parse it.
    x.responseType = 'json';
    x.onload = () => {
      // Parse and process the response from Google Image Search.
      let response = x.response;
      if (!response || !response.items || response.items.length === 0) {
        this.errorCallback('No response from Google Image search!');
        return;
      }

      if ( array && count > 1 ) {
        let imagesArray = [];
        for (let i = 0; i < count; i++) {
          let image = this.parseImgData(response.items[i]);
          imagesArray.push(image);
          if ( i === count - 1 ) {
            this.callback(imagesArray);
          }
        }
      } else {
        let image = this.parseImgData(response.items[0]);
        this.callback(image);
      }
    };
    x.onerror = () => {
      this.errorCallback('Network error.');
    };
    x.send();
  }

  parseImgData(imageData) {
    let imageUrl = imageData.image.thumbnailLink;
    let width = parseInt(imageData.image.thumbnailWidth);
    let height = parseInt(imageData.image.thumbnailHeight);
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    console.assert(
      typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
      'Unexpected respose from the Google Image Search API!');
    return {url: imageUrl, width: width,height: height}
  }


  callback(data) {
    this.loaded.next(data);
  }

  errorCallback(error) {
    this.loaded.error(error);
  }
}
