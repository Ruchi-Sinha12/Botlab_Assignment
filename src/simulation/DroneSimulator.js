// src/simulation/DroneSimulator.js
import MovementFactory from "./MovementFactory";
import logger from "../store/logger";

class DroneSimulator {
  constructor() {
    if (!DroneSimulator.instance) {
      this.observers = [];
      this.drone = {
        id: "DRONE-001",
        latitude: 37.7749,
        longitude: -122.4194,
        altitude: 100,
        heading: 0,
        speed: 0,
        battery: 100,
        gpsFix: "3D",
        failure: false,
      };
      this.movementStrategy = MovementFactory.create("random");
      DroneSimulator.instance = this;
    }
    return DroneSimulator.instance;
  }

  attach(observer) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach((obs) => obs.update(this.drone));
  }

  toggleFailure() {
    this.drone.failure = !this.drone.failure;
    if (this.drone.failure) {
      logger.log("Failure simulation activated");
    } else {
      logger.log("Failure simulation deactivated");
    }
  }

  updateDrone() {
    if (this.drone.failure) {
      this.drone.battery -= Math.random() * 5;
      this.drone.gpsFix = "No Fix";
      if (this.drone.battery < 0) this.drone.battery = 0;
    } else {
      this.movementStrategy.move(this.drone);
      this.drone.battery -= 0.1;
      if (this.drone.battery < 0) this.drone.battery = 0;
      this.drone.gpsFix = "3D";
    }
    this.notify();
  }
}

const droneSimulator = new DroneSimulator();
Object.freeze(droneSimulator);
export default droneSimulator;
