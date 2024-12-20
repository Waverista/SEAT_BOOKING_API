const Bus = require("../models/Bus");

const addTrip = async (req, res) => {
  const { busId } = req.params;
  const { date, startTime, arrivalTime, bookedSeats } = req.body;

  try {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const newTrip = {
      date,
      startTime,
      arrivalTime,
      bookedSeats,
    };

    bus.trips.push(newTrip);
    await bus.save();

    res.status(201).json({ message: "Trip added successfully", trip: newTrip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add trip", error: error.message });
  }
};

const updateTrip = async (req, res) => {
  const { busId, tripId } = req.params;
  const { date, startTime, arrivalTime, bookedSeats } = req.body;

  try {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const trip = bus.trips.id(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.date = date || trip.date;
    trip.startTime = startTime || trip.startTime;
    trip.arrivalTime = arrivalTime || trip.arrivalTime;
    trip.bookedSeats = bookedSeats || trip.bookedSeats;

    await bus.save();

    res.status(200).json({ message: "Trip updated successfully", trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update trip", error: error.message });
  }
};

const deleteTrip = async (req, res) => {
  const { busId, tripId } = req.params;

  try {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const tripIndex = bus.trips.findIndex((t) => t._id.toString() === tripId);
    if (tripIndex === -1) {
      return res.status(404).json({ message: "Trip not found" });
    }

    bus.trips.splice(tripIndex, 1);
    await bus.save();

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete trip", error: error.message });
  }
};

module.exports = {
  addTrip,
  updateTrip,
  deleteTrip,
};
