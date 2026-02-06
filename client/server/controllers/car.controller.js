import Car from "../models/Car.js";

/* Get all cars */
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Get single car */
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json("Car not found");
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Add new car */
export const addCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Delete car (only owner) */
export const deleteCar = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json("Car not found");

    if (car.ownerEmail !== userEmail) {
      return res.status(403).json("Not allowed");
    }

    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Update car (only owner) */
export const updateCar = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.ownerEmail !== userEmail) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
