export class Password {
  public serviceName: string;
  public userName: string;
  public email: string;
  public pass: string;
  public url: string;
  public desc: string;
  public img: string;

  constructor(serviceName: string, userName: string, email: string, pass: string, url: string, desc: string, img: string) {
    this.serviceName = serviceName;
    this.userName = userName;
    this.email = email;
    this.pass = pass;
    this.url = url;
    this.desc = desc;
    this.img = img;
  }
}
