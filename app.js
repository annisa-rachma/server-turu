if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express');
const { errHandler } = require('./middlewares/errorHandling');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(router);
app.use(errHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

module.exports = app