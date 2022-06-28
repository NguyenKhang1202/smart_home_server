const router = require("express").Router();
const { authUser, authAdmin } = require("../middlewares/auth.middleware");
const asyncWrap = require("../utils/asyncWrap");
const { validate } = require("express-validation");
// const { createMeterPowerValidation } = require('../validations/MeterPower.validation');
const {
  getMeterPower,
  getAllMeterPowers,
  createMeterPower,
  deleteMeterPower,
  editMeterPower,
} = require("../app/controllers/MeterPower.controller");

// Get all MeterPowers in house
router.get("/", authUser, asyncWrap(getAllMeterPowers));
router.get("/:id", authUser, asyncWrap(getMeterPower));
router.post("/", authUser, asyncWrap(createMeterPower));
router.delete("/:id", authUser, asyncWrap(deleteMeterPower));
router.patch("/:id", authUser, asyncWrap(editMeterPower));

module.exports = router;
