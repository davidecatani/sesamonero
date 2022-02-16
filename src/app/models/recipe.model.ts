export class Recipe {
  constructor(
    public author: Author,
    public category: string,
    public cookingTime: string,
    public date: string,
    public difficulty: string,
    public intro: string,
    public portions: number,
    public preparationTime: string,
    public id: number,
    public title: string,
    public description: string,
    public imageName: string,
    public ingredients: Ingredient[]
  ) {}
}

export interface Author {
  email: string;
  id: string;
  name: string;
}

export interface Ingredient {
  ingredient?: string;
  quantity?: string;
  unityOfMeasure?: string;
  note?: string;
}
