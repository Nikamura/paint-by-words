import uuid from "uuid/v4";
import faker from "faker";

export class Player {
  public id: string;
  public name: string;

  constructor({ id, name }: { id?: string, name?: string } = {}) {
    this.id = id || uuid();
    this.name = name || faker.name.findName();
  }
}
