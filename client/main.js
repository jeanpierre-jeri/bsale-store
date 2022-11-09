// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
const $ = (selector) => document.querySelector(selector)

const products = []

const getProducts = async () => {
  $('#loading').classList.remove('hidden')

  try {
    const response = await fetch('http://localhost:4000/api/products')
    const data = await response.json()
    products.push(...data)
    setProducts()
  } catch (error) {
    console.log(error.message)
  } finally {
    $('#loading').classList.add('hidden')
  }
}

const setProducts = () => {
  if (!products.length) return
  const fragment = document.createDocumentFragment()
  products.forEach((product) => {
    const discount = product.discount > 0 ? product.price : ''
    const div = document.createElement('div')
    div.classList =
      'bg-gray-200 max-w-full rounded overflow-hidden shadow-lg hover:shadow-xl opacity-2 flex flex-col h-full w-full'
    const html = `
      <div style="height: 20rem;">
        <img 
            src="${product.url_image || '/no-photos.png'}" 
            alt="bebida"
            style="object-fit: scale-down;"
            class="bg-white h-full w-full block"
        >
      </div>
      <h3 class="itemName p-3 text-center text-base font-bold">${product.name.toUpperCase()}</h3>
      <div class="flex justify-between border-t border-gray-400 p-3 items-center">
        <div class="flex" style="gap: 1rem;">
            <p class="priceValue font-bold text-sm">$${product.price - product.discount}</p>
            <span style="text-decoration: line-through;">${discount}</span>
        </div>
        <button 
          onclick="addToCart(${product.id}, '${product.name}', ${product.price - product.discount}, '${
      product.url_image
    }')" 
          class="product bg-gray-300 rounded-full px-3 py-2 hover:bg-gray-400 cursor-pointer">
            <i class="fas fa-cart-plus"></i>
        </button>
      </div>
    `
    div.innerHTML = html

    fragment.appendChild(div)
  })

  $('#products').appendChild(fragment)
}

getProducts()
