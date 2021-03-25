const { v4 } = require('uuid');

let users = [
  {
    id: v4(),
    name: 'Fillipe',
    email: 'fillipe@gmail.com',
  },

  {
    id: v4(),
    name: 'Joao',
    email: 'joao@gmail.com',
  },

  {
    id: v4(),
    name: 'Maria',
    email: 'maria@gmail.com',
  },
];

class UsersRepository {
  findAll() {
    return new Promise((resolve) => resolve(users));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.email === email),
    ));
  }

  create({
    name, email,
  }) {
    return new Promise((resolve) => {
      const newUser = {
        id: v4(),
        name,
        email,
      };

      users.push(newUser);
      resolve(newUser);
    });
  }

  update(id, { name, email }) {
    return new Promise((resolve) => {
      const updatedUser = {
        id, name, email,
      };

      users = users.map((user) => (
        user.id === id ? updatedUser : user
      ));

      resolve(updatedUser);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      users = users.filter((user) => user.id !== id);

      resolve();
    });
  }
}

module.exports = new UsersRepository();
