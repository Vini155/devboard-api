const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const githubRoutes = require('./routes/githubRoutes');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/github', githubRoutes);


// app.post('/getToken', async (req, res) => {

//   console.log('body', req.body);
//   res.json({ message: 'Token received' });

// }
// );

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});