enum CarTransmission {
  Automatic = 200,
  Manual = 300
}

interface Motorcycle {
  vType: "motorcycle"
  make: number
}

interface Car {
  vType: "car"
  transmission: CarTransmission
}

interface Truck {
  vType: "truck"
  capacity: number
}

type Vehicle = Motorcycle | Car | Truck

const EVALUATION_FACTOR = Math.PI
function evaluaterPrice(vehicle: Vehicle) {
  switch(vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "motorcycle": 
      return vehicle.make * EVALUATION_FACTOR
    case "truck": 
      return vehicle.capacity * EVALUATION_FACTOR
  }
}

const myTruck: Truck = {vType: "truck", capacity: 9.5}
evaluaterPrice(myTruck)