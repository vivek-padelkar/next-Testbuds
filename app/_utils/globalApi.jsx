import axios from 'axios'

const axisoClient = axios.create({
  baseURL: 'http://localhost:1337/api',
})

const getCategory = () => axisoClient.get('/categories?populate=*')

export default getCategory
