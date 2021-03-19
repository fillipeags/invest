class UserController {
  index(request, response) {
    response.send('Sent from UserController');
  }

  show() {}

  update() {}

  delete() {}
}

module.exports = new UserController();
