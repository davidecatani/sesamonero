export interface User {
  uid: string;
  displayName: string;
  loading?: boolean;
  error?: string;
}

export class User {
  constructor(
    public uid: string,
    public displayName: string,
    public loading?: boolean,
    public error?: string
  ) {}
}
