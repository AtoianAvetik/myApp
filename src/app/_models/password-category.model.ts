import { Password } from './password.model';

export class PasswordCategory {
  constructor(public id: string,
              public name: string,
              public content: Array<Password>,
              public parentCategory: string,
              public childCategories: Array<any>) {}
}
