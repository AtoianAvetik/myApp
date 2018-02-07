import { Password } from './password.model';

export class PasswordCategory {
  constructor(public id: string,
              public name: string,
              public parentCategory: string = '',
              public content: Array<Password> = [],
              public childCategories: Array<any> = [],
              public editable: boolean = true,
              public deletable: boolean = true) {}
}
