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

  it('should redirect to /login.html', (done) => {
    request(app())

      .get('/login')
      .expect('location', '/login.html')
      .expect(302)
      .end((err, res) => {
        done(err);
      })
  });

  it('should redirect to /login.html', (done) => {
    request(app())

      .get('/login.html')
      .expect(/login/)
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
      .expect('location', '/index.html', done);

  });

  it('should not login an unregistered user', (done) => {
    request(app())

      .post('/login')
      .send('username=unRegisteredUser')
      .expect(401, done);
  });
});


describe('Get /register.html', () => {
  it('should server the register.html', (done) => {

    request(app())
      .get('/register.html')
      .expect(/User Registration/)
      .expect('content-type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });

  it('should redirect to register.html', (done) => {

    request(app())
      .get('/register')
      .expect('location', '/register.html')
      .expect(302, done);
  });

});

describe('Get /ankammrao', () => {
  it('should give 404 code for /ankammarao', (done) => {
    const { sessions, id } = createSession();

    request(app(sessions))
      .get('/badFile')
      .set('cookie', `id=${id}`)
      .expect(404, done);
  });
});


describe('Get /', () => {
  it('should server the index.html', (done) => {
    const { sessions, id } = createSession();

    request(app(sessions))
      .get('/')
      .set('cookie', `id=${id}`)
      .expect(/freshOrigins/)
      .expect('content-type', 'text/html; charset=UTF-8')
      .expect(200, done);

  });
});

describe('Get /guest-book', () => {
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

describe('Get /file-upload', () => {
  it('should server the file-upload.html', (done) => {
    const { sessions, id } = createSession();

    request(app(sessions))
      .get('/fileUpload.html')
      .set('cookie', `id=${id}`)
      .expect(/uploadFile : /)
      .expect('content-type', 'text/html; charset=UTF-8')
      .expect(200, done);

  });
});

describe('Post /file-upload', () => {
  it('should give the response of file uploaded', (done) => {
    const { sessions, id } = createSession();

    request(app(sessions))
      .post('/upload-file')
      .set('cookie', `id=${id}`)
      .field('username', 'ankammarao')
      .field('file', 'index.js')
      .expect('files Uploaded')
      .expect(200, done);
  });
});
