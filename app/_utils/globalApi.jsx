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
    throw error
  }
}

const signinUser = async (reqBody) => {
  try {
    const data = await axisoClient.post('/auth/local', {
      identifier: reqBody.email,
      password: reqBody.password,
    })
    return { user: data.data.user, token: data.data.jwt }
  } catch (error) {
    throw error
  }
}

const addToCart = async (reqBody, jwt) => {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    await axisoClient.post('/user-carts', reqBody, headers)
  } catch (error) {
    throw error
  }
}
const getCartItems = async (userid, token) => {
  try {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axisoClient.get(
      `/user-carts?filters[userid][$eq]=${userid}&[populate][product][populate][images][populate][0]=url`,
      headers
    )

    const result = data.data
    const cartItemsList = result.map((item, index) => {
      return {
        name: item?.attributes?.product?.data?.attributes?.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          item?.attributes?.product?.data?.attributes?.images?.data[0]
            ?.attributes?.url,
        actualPrice: item?.attributes?.product?.data?.attributes?.mrp,
        id: item.id,
        product: item?.attributes?.product?.data?.id,
      }
    })

    return cartItemsList
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteCartItem = async (id, token) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  await axisoClient.delete(`/user-carts/${id}`, headers)
  return true
}

export {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getAllProductsByCategory,
  registerUser,
  signinUser,
  addToCart,
  getCartItems,
  deleteCartItem,
}
