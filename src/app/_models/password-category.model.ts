import { Password } from './password.model';

export class PasswordCategory {
  public id: string;
  public name: string;
  public content: Array<Password>;
  public parentCategory: string;
  public childCategories: Array<any>;

  constructor(id: string, name: string, content: Array<Password>, parentCategory: string, childCategories: Array<any>) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.parentCategory = parentCategory;
    this.childCategories = childCategories;
  }
}
