import axios from 'axios'

const axisoClient = axios.create({
  baseURL: 'http://localhost:1337/api',
})

// to get category
const getCategory = () => axisoClient.get('/categories?populate=*')

// to get slider data
const getSliders = () =>
  axisoClient.get('/sliders/?populate=*').then((res) => res.data.data)

//to get category List
const getCategoryList = () =>
  axisoClient.get('/categories/?populate=*').then((res) => res.data.data)

//to get products
const getAllProducts = () =>
  axisoClient.get('/products/?populate=*').then((res) => res.data.data)

// get products by category
const getAllProductsByCategory = (category) =>
  axisoClient
    .get(`/products?filters[categories][name][$in]=${category}&populate=*`)
    .then((res) => res.data.data)

const registerUser = async (reqBody) => {
  try {
    const data = await axisoClient.post('/auth/local/register', reqBody)
    return { user: data.data.user, token: data.data.jwt }
  } catch (error) {
    // console.log('An error occurred:', error.response)
    throw error
  }
}

const signinUser = async (reqBody) => {
  try {
    const data = await axisoClient.post('/auth/local', {
      identifier: reqBody.email,
      password: reqBody.password,
    })
    console.log(data)
    return { user: data.data.user, token: data.data.jwt }
  } catch (error) {
    // console.log('An error occurred:', error.response)
    throw error
  }
}

export {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getAllProductsByCategory,
  registerUser,
  signinUser,
}
