const myEmployees = require('./employees')

const getEmployees = ((req, res) => {

    try {
        console.log(myEmployees)
        return res.status(200).json(myEmployees)
    }
    catch (error) {
        return res.status(404).json(error);
    }
});

const getByName = ((req, res) => {

    try {
        const name = req.body.name;

        const empDetail = myEmployees.filter((emp) => {
            if (emp.name === name) {
              return ({
                name: emp.name,
                age: emp.age,
                designation: emp.designation,
                experience: emp.experience,
                salary: emp.salary,
                roles: emp.roles
              });
            }
          });
        if (empDetail.length > 0) {
            console.log(empDetail)
            return res.status(200).json(empDetail[0])
        } else {
            return res.status(400).json({ message: "employee not found" })
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
});

module.exports = { getEmployees, getByName }