class Vacation {
  public id: number;
  public destination: string;
  public description: string;
  public begin: any;
  public finish: any;
  public price: number;
  public img: string;

  constructor(
    id: number,
    destination: string,
    description: string,
    begin: any,
    finish: any,
    price: number,
    img: string
  ) {
    this.id = id;
    this.destination = destination;
    this.description = description;
    this.begin = begin;
    this.finish = finish;
    this.price = price;
    this.img = img;
  }
}

export default Vacation;
