const { RESTDataSource } = require('apollo-datasource-rest');

class QuoteAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.quotable.io/';
    this.initialize({})
  }

  quoteReducer(quote) {
    return {
      id: quote._id|| 0,
      cursor: `${quote.length}`,
      content: quote.content,
      author:quote.author      
    };
  }
  
  
  
  async getAllQuotes(tag) {
    const response = await this.get(`quotes?tags=${tag}`);
    return Array.isArray(response.results)
      ? response.results.map(quote => this.quoteReducer(quote))
      : [];
  } 
  
}

module.exports = QuoteAPI;