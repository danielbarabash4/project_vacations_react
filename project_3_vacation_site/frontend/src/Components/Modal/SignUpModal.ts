export class SignUpModal {
  public name: string;
  public lastName: string;
  public email: string;
  public password: string;

  constructor(
    name: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

export default SignUpModal
