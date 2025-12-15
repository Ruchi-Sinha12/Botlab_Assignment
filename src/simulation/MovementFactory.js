// src/simulation/MovementFactory.js
import { Hovering, RandomWalk } from "./MovementStrategy";

export default class MovementFactory {
  static create(type) {
    switch (type) {
      case "hovering":
        return new Hovering();
      case "random":
        return new RandomWalk();
      default:
        return new Hovering();
    }
  }
}
