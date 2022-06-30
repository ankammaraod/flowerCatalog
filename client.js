const http = require('http');
// while (true) {
let data = ''
const request = http.get('http://localhost:9000/api/guest-book', response => {
  response.on('data', chunk => {
    data += chunk;
  });

  response.on('end', () => {
    const comments = JSON.parse(data);

    console.log(comments.filter(comment => {
      if (comment.comment.match(/.*beautiful.*/)) {
        return true;
      }
    }));

  })
});

request.end();
// };

