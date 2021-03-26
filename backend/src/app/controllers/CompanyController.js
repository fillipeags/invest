const CompaniesRepository = require('../repositories/CompaniesRepository');

class CompanyController {
  async index(request, response) {
    const companies = await CompaniesRepository.findAll();

    response.json(companies);
  }

  async show(request, response) {
    const { id } = request.params;

    const company = await CompaniesRepository.findById(id);

    if (!company) {
      return response.status(404).json({ error: 'Company not found' });
    }

    response.json(company);
  }

  async store(request, response) {
    const {
      id, name, field, stock_average_price, total_stocks,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!id) {
      return response.status(400).json({ error: 'Company ID is required' });
    }

    if (!field) {
      return response.status(400).json({ error: 'Field is required' });
    }

    const companyExists = await CompaniesRepository.findById(id);

    if (companyExists) {
      return response.status(400).json({ error: 'This company is already on the system' });
    }

    const company = await CompaniesRepository.create({
      id, name, field, stock_average_price, total_stocks,
    });

    response.json(company);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name, field, average_price, total,
    } = request.body;

    const companyExists = await CompaniesRepository.findById(id);

    if (!companyExists) {
      return response.status(404).json({ error: 'Company not found' });
    }

    const company = await CompaniesRepository.update(id, {
      name, field, average_price, total,
    });

    response.json(company);
  }

  async delete(request, response) {
    const { id } = request.params;

    const company = await CompaniesRepository.findById(id);

    if (!company) {
      return response.status(404).json({ error: 'Company not found' });
    }

    await CompaniesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CompanyController();
