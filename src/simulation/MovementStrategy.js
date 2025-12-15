// src/simulation/MovementStrategy.js
export class Hovering {
  move(drone) {
    // Slight random drift
    drone.latitude += (Math.random() - 0.5) * 0.0001;
    drone.longitude += (Math.random() - 0.5) * 0.0001;
    drone.heading += (Math.random() - 0.5) * 2;
  }
}

export class RandomWalk {
  move(drone) {
    drone.latitude += (Math.random() - 0.5) * 0.001;
    drone.longitude += (Math.random() - 0.5) * 0.001;
    drone.heading += (Math.random() - 0.5) * 5;
    drone.speed = Math.random() * 10;
  }
}
