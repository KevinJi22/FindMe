import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer g6JObgYLTUeUmRYFIQwebF8n9rC8vBlNKNSq_pNcyG5kNDWsQA1HBqqesxiYTy8UgYtHnYuY_ZGFirYLqQziNZCK7xzOCs9WKBtW6D2vBM5vLGH41YPRW0R6eIVQXnYx`
  }
});
