const { paginateResults } = require('./utils');
module.exports = {
    Query: {
        quotes: async (_,{tag, after}, { dataSources }) =>{
      const allQuotes= await dataSources.quoteAPI.getAllQuotes(tag);
        const pageSize=1;
        const quotes = paginateResults({
            after,
            pageSize,
            results: allQuotes
          });
          console.log(quotes)
          return {
            quotes,
            cursor: quotes.length ? quotes[quotes.length - 1].cursor : null,
            // if the cursor at the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: quotes.length
              ? quotes[quotes.length - 1].cursor !==
              allQuotes[allQuotes.length - 1].cursor
              : false
          };
        
        },
    tags: (_, {sortOrder='asc'}, { dataSources }) =>
        dataSources.tagAPI.getAllTags(sortOrder)
    }
  };
  