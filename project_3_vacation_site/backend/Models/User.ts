class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  admin: string;

  constructor(
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    admin: string
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.admin = admin;
  }
}

export default User;
