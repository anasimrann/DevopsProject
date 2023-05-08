const { getEmployees, getByName } = require("./controller");

const router = require("express").Router();

router.get("/get/employee", getEmployees);
router.post("/find/employee", getByName);

module.exports = router;