const { RESTDataSource } = require('apollo-datasource-rest');

class TagsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.quotable.io/';
    this.initialize({})
  }


  
  tagReducer(quote) {
    return {
      id: quote._id|| 0,
    //   cursor: `${launch.launch_date_unix}`,
      content: quote.name,
    //   author:quote.author      
    };
  }


   
  async getAllTags() {
  const response = await this.get('tags');
  return Array.isArray(response)
    ? response.map(tag => this.tagReducer(tag))
    : [];
}
  
}

module.exports = TagsAPI;