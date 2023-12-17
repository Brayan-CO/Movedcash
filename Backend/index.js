const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
require('dotenv').config();

const { connection } = require('./Config/MongoDB');
const userRouter = require('./Routes/user.route');
const calendarRouter = require('./Routes/calendar.route');
const movedRouter = require('./Routes/Moved.route');

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/calendar', calendarRouter);
app.use('/moved', movedRouter);


connection.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});
