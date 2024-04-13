import axios from 'axios'

const axisoClient = axios.create({
  baseURL: 'http://localhost:1337/api',
})

const getCategory = () => axisoClient.get('/categories?populate=*')
const getSliders = () =>
  axisoClient.get('/sliders/?populate=*').then((res) => res.data.data)
const getCategoryList = () =>
  axisoClient.get('/categories/?populate=*').then((res) => res.data.data)

const getAllProducts = () =>
  axisoClient.get('/products/?populate=*').then((res) => res.data.data)

export { getCategory, getSliders, getCategoryList, getAllProducts }
