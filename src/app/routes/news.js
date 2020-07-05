const dbConnection = require('../../config/dbConnection');

module.exports = app => {

  const connection = dbConnection();

  connection.query('SELECT * FROM users', (err, result) => {
    console.log('error: ', err);
    console.log('result: ', result);
  });

  app.get('/news', (req, res) => {
    connection.query('SELECT * FROM news', (err, result) => {
      res.render('news/news', {
        news: result
      });
    });
  });

  app.post('/news', (req, res) => {
    const { title, news } = req.body;
    connection.query('INSERT INTO news SET ? ',
      {
        title,
        news
      }
    , (err, result) => {
      res.redirect('/news');
    });
  });
};
