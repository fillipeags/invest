let companies = [
  {
    id: 'PETR4',
    name: 'Petrobras',
    field: 'Offshore',
    average_price: '10.24',
    total: '112',
  },

  {
    id: 'APPL3',
    name: 'Apple',
    field: 'Tech',
    average_price: '10.24',
    total: '112',
  },
];

class CompaniesRepository {
  findAll() {
    return new Promise((resolve) => resolve(companies));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      companies.find((company) => company.id === id),
    ));
  }

  create({
    id, name, field, average_price, total,
  }) {
    return new Promise((resolve) => {
      const newCompany = {
        id,
        name,
        field,
        average_price,
        total,
      };

      companies.push(newCompany);
      resolve(companies);
    });
  }

  update(id, {
    name, field, average_price, total,
  }) {
    return new Promise((resolve) => {
      const updatedCompany = {
        id, name, field, average_price, total,
      };

      companies = companies.map((company) => (
        company.id === id ? updatedCompany : company
      ));

      resolve(updatedCompany);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      companies = companies.filter((company) => company.id !== id);

      resolve();
    });
  }
}

module.exports = new CompaniesRepository();
