export class PassItem {
  public serviceName: string;
  public userName: string;
  public email: string;
  public pass: string;

  constructor(serviceName: string, userName: string, email: string, pass: string) {
    this.serviceName = serviceName;
    this.userName = userName;
    this.email = email;
    this.pass = pass;
  }
}
