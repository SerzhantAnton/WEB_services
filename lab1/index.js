const express = require('express');
const cors = require('cors');
const departmentRouter = require('./routes/department.route');
const professorRouter = require('./routes/professor.route');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', departmentRouter);
app.use('/api', professorRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
