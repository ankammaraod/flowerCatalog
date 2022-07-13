const { app } = require('../src/app.js');
const request = require('supertest');

const createSession = () => {
  const sessions = {};
  const id = new Date();
  const session = { id, username: 'ankammrao' };
  sessions[session.id] = session;
  return { sessions, id };
};

describe('GET /login', () => {

  it('should give login page for /login', (done) => {
    request(app())

      .get('/login')
      .expect(/login/)
      .expect('content-type', 'text/html')
      .expect(200)
      .end((err, res) => {
        done(err);
      })
  });
});

describe('POST /login', () => {
  it('should give the status as 302 and redirection location', (done) => {
    request(app())

      .post('/login')
      .send('username=ankammarao')
      .expect(302)
      .expect('location', '/flowerCatlog.html', done);

  });
  it('should not login an unregistered user', (done) => {
    request(app())

      .post('/login')
      .send('username=unRegisteredUser')
      .expect(401)
      .expect(/user not registered/, done);
  });
});


describe('Get /ankammrao', () => {
  it('should give 404 code for /ankammarao', (done) => {
    const { sessions, id } = createSession();

    request(app(sessions))
      .get('/badFile')
      .set('cookie', `id=${id}`)
      .expect('file not found')
      .expect('content-type', 'text/plain')
      .expect(404, done);
  });
});


describe('Get /', () => {
  it('should server the /flowerCatlog', (done) => {
    const { sessions, id } = createSession();

    request(app(sessions))
      .get('/')
      .set('cookie', `id=${id}`)
      .expect(/freshOrigins/)
      .expect('content-type', 'text/html')
      .expect(200, done);

  });
});

describe('get /guest-book', () => {
  it('should serve the guest book', (done) => {
    const { sessions, id } = createSession();

    request(app(sessions))
      .get('/guest-book')
      .set('cookie', `id=${id}`)
      .expect(/add-comment/)
      .expect('content-type', 'text/html')
      .expect(200, done);

  });
});
