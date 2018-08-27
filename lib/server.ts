import app from './app';

app.get('/', (req, res) => res.send('React-Form api is online!'))

app.listen(process.env.PORT || 4000, function () {
  console.log('now listening for requests');
}); 