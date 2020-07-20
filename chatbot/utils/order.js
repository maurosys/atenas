class Order {
  constructor(body) {}

  async listOffers(body) {
    const url = `http://localhost:3000/products/offers=${body.offers}?priority=${body.priority}`;
    try {
      const result = await axios.get(url);
    } catch (err) {
      return 'Nada foi encontrado';
    }
  }
}
