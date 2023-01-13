const db = require('../db')

class DepartmentController {
    async creatDepartment(req, res){
        const { name } = req.body;
        const newDepartment = await db.query(`INSERT INTO department (name) VALUES ($1) RETURNING *`,
            [name]);
        res.json(newDepartment.rows[0]);
    }

    async getDepartments(req, res){
        const departments = await db.query(`SELECT * FROM department`);
        res.json(departments.rows);
    }

    async getOneDepartment(req, res){
        const id = req.params.id;
        const department = await db.query(`SELECT * FROM department WHERE id=$1`, [id]);
        res.json(department.rows[0]);
    }

    async updateDepartment(req, res){
        const { id, name } = req.body;
        const department = await db.query(
            `UPDATE department SET name= $1 WHERE id = $2 RETURNING *`, [name, id]
        );
        res.json(department.rows[0]);
    }

    async deleteDepartment(req, res){
        const id = req.params.id;
        const department = await db.query(`DELETE FROM department WHERE id=$1`, [id]);
        res.json(department.rows[0]);
    }
}

module.exports = new DepartmentController()
