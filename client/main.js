import './styles.css'

const BASE_API = 'http://localhost:4000/api'
const $ = (selector) => document.querySelector(selector)

const products = []
const categories = []

const getProductsAndCategories = async () => {
  $('#loading').classList.remove('hidden')

  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`${BASE_API}/products`).then((resp) => resp.json()),
      fetch(`${BASE_API}/categories`).then((resp) => resp.json())
    ])
    products.push(...productsResponse)
    categories.push(...categoriesResponse)
    setProducts()
    setCategories()
  } catch (error) {
    console.log(error.message)
  } finally {
    $('#loading').classList.add('hidden')
  }
}

const setProducts = () => {
  if (!products.length) {
    $('#products').innerHTML =
      '<p class="text-center text-2xl col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">No hay productos para mostrar...</p>'
    return
  }
  const fragment = document.createDocumentFragment()
  products.forEach((product) => {
    const discount = product.discount > 0 ? product.price : ''
    const article = document.createElement('article')
    article.classList =
      'bg-gray-200 max-w-full rounded overflow-hidden shadow-lg hover:shadow-xl opacity-2 flex flex-col h-full w-full'
    article.innerHTML = `
    <img 
      src="${product.url_image || '/no-photos.png'}" 
      alt="bebida"
      class="object-scale-down bg-white h-80 w-full"
    >
      <h3 class="itemName p-3 text-center text-base font-bold">${product.name?.toUpperCase()}</h3>
      <div class="flex justify-center border-t border-gray-400 p-3 items-center gap-2">
      <p class="priceValue font-bold text-lg">$${product.price - product.discount}</p>
      <span class="line-through text-xs">${discount}</span>
      </div>
    </div>
    `

    fragment.appendChild(article)
  })

  $('#products').appendChild(fragment)
}

const setCategories = () => {
  if (!categories.length) return

  const fragment = document.createDocumentFragment()

  categories.forEach((category) => {
    const button = document.createElement('button')
    button.classList =
      'category bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600 capitalize'
    button.innerText = category.name
    button.dataset.category = category.id
    fragment.appendChild(button)
  })

  $('#categories').appendChild(fragment)

  const $categoryButtons = document.querySelectorAll('.category')

  $categoryButtons.forEach((btn) => {
    btn.addEventListener('click', handleCategoryButtonClick)
  })
}

const handleCategoryButtonClick = async (e) => {
  const $categoryButtons = document.querySelectorAll('.category')
  $categoryButtons.forEach((btn) => {
    btn.classList.remove('bg-blue-600')
    btn.classList.add('bg-blue-500')
  })

  const category = e.currentTarget.dataset.category
  e.target.classList.add('bg-blue-600')
  $('#loading').classList.remove('hidden')
  $('#products').innerHTML = ''
  products.length = 0

  try {
    const productsData = await fetch(`${BASE_API}/products?category=${category}`).then((resp) => resp.json())
    products.push(...productsData)
    setProducts()
  } catch (error) {
    console.log(error.message)
  } finally {
    $('#loading').classList.add('hidden')
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const search = e.target.search.value

  $('#loading').classList.remove('hidden')
  $('#products').innerHTML = ''
  products.length = 0

  try {
    const data = await fetch(`${BASE_API}/products?name=${search}`).then((resp) => resp.json())
    if (!(data.status === 'NOT_FOUND')) {
      products.push(...data)
    }
    setProducts()
  } catch (error) {
    console.log(error.message)
  } finally {
    $('#loading').classList.add('hidden')
  }
}

$('#form').addEventListener('submit', handleSubmit)

// Get initial products and categories
getProductsAndCategories()
