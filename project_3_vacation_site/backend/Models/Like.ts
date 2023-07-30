export class Like {
  userId: number;
  vacId: number;
  vacName: string;

  constructor(userId: number, vacId: number, vacName: string) {
    this.userId = userId;
    this.vacId = vacId;
    this.vacName = vacName;
  }
}

export default Like;
