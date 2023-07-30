export class LoggedModal {
  public id: number;
  public name: string;
  public admin: string;

  constructor(id: number, name: string, admin: string) {
    this.id = id;
    this.name = name;
    this.admin = admin;
  }
}

export default LoggedModal;
