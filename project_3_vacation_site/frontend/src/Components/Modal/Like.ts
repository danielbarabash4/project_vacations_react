export class Like {
  userId: number;
  vac_id: number;

  constructor(userId: number, vacId: number) {
    this.userId = userId;
    this.vac_id = vacId;
  }
};

export default Like;
