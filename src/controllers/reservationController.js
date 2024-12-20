const Reservation = require("../models/Reservation");
const Bus = require("../models/Bus");

const createReservation = async (req, res) => {
  const { busId, tripId, seatNumber } = req.body;
  const commuter = req.user.id;

  try {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const trip = bus.trips.find((t) => t._id.toString() === tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const reservationExists = await Reservation.findOne({
      bus: busId,
      tripId,
      seatNumber,
    });
    if (reservationExists) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    const newReservation = new Reservation({
      commuter,
      bus: busId,
      trip: trip._id,
      tripId,
      tripDate: trip.date,
      startTime: trip.startTime,
      arrivalTime: trip.arrivalTime,
      seatNumber,
    });

    await newReservation.save();
    res.status(201).json({
      message: "Reservation created successfully",
      reservation: newReservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create reservation",
      error: error.message,
    });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("commuter bus")
      .populate({
        path: "bus",
        populate: {
          path: "trips",
        },
      });
    res.status(200).json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve reservations",
      error: error.message,
    });
  }
};

const getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id)
      .populate("commuter bus")
      .populate({
        path: "bus",
        populate: {
          path: "trips",
        },
      });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({ reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve reservation",
      error: error.message,
    });
  }
};

const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { seatNumber, paymentStatus } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { seatNumber, paymentStatus },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({
      message: "Reservation updated successfully",
      reservation: updatedReservation,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update reservation", error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  const { id } = req.params;
  const commuterId = req.user.id;
  const userRole = req.user.role;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (
      userRole !== "admin" &&
      reservation.commuter.toString() !== commuterId
    ) {
      return res
        .status(403)
        .json({ message: "You can only delete your own reservations" });
    }

    await Reservation.findByIdAndDelete(id);

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete reservation", error: error.message });
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
