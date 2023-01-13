const db = require('../db');
class ProfessorController {

    async createProfessor(req, res){
        const { name, surname, department_id } = req.body;
        const newProfessor = await db.query(
            `INSERT INTO professor (name, surname, department_id) VALUES ($1, $2, $3) RETURNING *`,
            [name, surname, department_id]
        );
        res.json(newProfessor.rows[0]);
    }

    async getProfessorsByDepartment(req, res){
        const {id} = req.query;
        const getProfessors = await db.query(`SELECT name, surname FROM professor WHERE department_id=$1`, [id]);
        res.json(getProfessors.rows);
    }

}

module.exports = new ProfessorController();
