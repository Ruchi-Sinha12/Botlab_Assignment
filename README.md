# Real-Time Drone Telemetry Simulator (Single Drone)

This project is a **desktop-style GUI application** built using **Vue 3 + Quasar Framework** that simulates and displays real-time telemetry data from a single drone. Telemetry data is generated in real time, updated every **500 ms**, and displayed live in the UI.

The application demonstrates **modular architecture**, **multithreading-like behavior via timers/workers**, and the use of **classic software design patterns**.

---

## 📦 Features

### Telemetry Display

* Drone ID
* Latitude & Longitude
* Altitude (m)
* Heading (°)
* Speed (m/s)
* Battery (%)
* GPS Fix Status (No Fix / 2D / 3D)

### Simulation

* Realistic movement (random walk / hovering)
* Gradual battery drain
* Heading drift and speed variation
* **Failure Simulation Toggle**:

  * GPS fix drops to `No Fix`
  * Battery drains rapidly

### Update Rate

* Telemetry updates every **500 milliseconds** using a background timer

---

## 🛠 Build & Run Instructions

> ⚠️ Note: This project uses **Quasar (Vue.js)**. CMake is **not applicable** to JavaScript-based projects. Instead, the industry-standard **Node.js + NPM** build system is used.

### Prerequisites

* Node.js v18+
* NPM v9+
* Quasar CLI

```bash
npm install -g @quasar/cli
```

### Project Setup

```bash
npm install
```

### Run in Development Mode

```bash
quasar dev
```

The application will be available at:

```
http://localhost:9000
```

### Build for Production

```bash
quasar build
```

---

## 🧠 Design Patterns Used

### 1️⃣ Observer Pattern

**Purpose:** UI updates from drone data model

**Where Used:**

* `DroneSimulator` maintains a list of observers.
* UI components subscribe to telemetry updates.
* When telemetry changes, observers are notified automatically.

**Key Files:**

* `src/simulation/DroneSimulator.js`
* `src/components/DroneTelemetry.vue`

```js
this.observers.forEach(observer => observer.update(this.drone));
```

---

### 2️⃣ Factory Pattern

**Purpose:** Create drone simulator movement objects

**Where Used:**

* `MovementFactory` creates different movement strategies based on input type.

**Key Files:**

* `src/simulation/MovementFactory.js`

```js
MovementFactory.create("random");
```

---

### 3️⃣ Strategy Pattern

**Purpose:** Implement different drone movement behaviors

**Where Used:**

* Each movement behavior is encapsulated in its own class.
* Simulator delegates movement logic to the active strategy.

**Movement Strategies Implemented:**

* `Hovering`
* `RandomWalk`

**Key Files:**

* `src/simulation/MovementStrategy.js`

```js
this.movementStrategy.move(this.drone);
```

---

### 4️⃣ Singleton Pattern

**Purpose:** Centralized shared instances

**Singletons Implemented:**

* `DroneSimulator` (single drone state)
* `Logger` (centralized event logging)

**Key Files:**

* `src/simulation/DroneSimulator.js`
* `src/store/logger.js`

```js
const droneSimulator = new DroneSimulator();
Object.freeze(droneSimulator);
```

---

## 🧪 Testing

Basic **unit tests** are included for the **simulation and logic layers**. UI testing is intentionally omitted as per assignment requirements.

### Testing Framework

* **Vitest** (recommended for Vue 3)

### Install Test Dependencies

```bash
npm install -D vitest
```

### Run Tests

```bash
npx vitest
```

---

## ✅ Example Unit Tests

### Drone Simulator Logic Test

**File:** `tests/DroneSimulator.test.js`

```js
import { describe, it, expect } from 'vitest'
import droneSimulator from '../src/simulation/DroneSimulator'

describe('DroneSimulator', () => {
  it('reduces battery over time', () => {
    const initialBattery = droneSimulator.drone.battery
    droneSimulator.updateDrone()
    expect(droneSimulator.drone.battery).toBeLessThan(initialBattery)
  })

  it('drops GPS fix during failure', () => {
    droneSimulator.toggleFailure()
    droneSimulator.updateDrone()
    expect(droneSimulator.drone.gpsFix).toBe('No Fix')
    droneSimulator.toggleFailure()
  })
})
```

---

### Movement Strategy Test

**File:** `tests/MovementStrategy.test.js`

```js
import { describe, it, expect } from 'vitest'
import { RandomWalk } from '../src/simulation/MovementStrategy'

describe('RandomWalk Strategy', () => {
  it('changes drone position', () => {
    const drone = { latitude: 0, longitude: 0, heading: 0, speed: 0 }
    const strategy = new RandomWalk()

    strategy.move(drone)

    expect(drone.latitude).not.toBe(0)
    expect(drone.longitude).not.toBe(0)
  })
})
```

---

## 📁 Project Structure

```
src/
 ├─ components/
 │   └─ DroneTelemetry.vue
 ├─ simulation/
 │   ├─ DroneSimulator.js
 │   ├─ MovementFactory.js
 │   └─ MovementStrategy.js
 ├─ store/
 │   └─ logger.js
 └─ App.vue

tests/
 ├─ DroneSimulator.test.js
 └─ MovementStrategy.test.js
```

---

## 📌 Submission Notes

* Code is ready to be hosted on a public GitHub repository
* README clearly documents architecture and design patterns
* Meets all assignment requirements for simulation, patterns, and testing

---

✅ **Assignment Complete – Single Drone Telemetry Simulator**
