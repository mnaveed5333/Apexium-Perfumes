import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiHeart, FiShoppingCart, FiMinus, FiPlus, FiArrowUp } from 'react-icons/fi'
import { BsHeartFill } from 'react-icons/bs'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import ProductCarousel from '../components/product/ProductCarousel'
import { products } from '../utils/constants'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id))
    setProduct(foundProduct)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
  }

  const handleOrderOnWhatsApp = () => {
    const message = `Hi, I want to order: ${product.title}\nQuantity: ${quantity}\nPrice: $${product.price * quantity}\n\nProduct Link: ${window.location.href}`
    const whatsappUrl = `https://wa.me/923405542097?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-teal-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-teal-500">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Thumbnails if multiple images */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`border-2 rounded-lg overflow-hidden bg-gray-100 ${selectedImage === i ? 'border-teal-500' : 'border-gray-200'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-20 object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="relative">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="absolute top-0 right-0 cursor-pointer" onClick={() => {
              if (!isAuthenticated) {
                alert('Please login to manage your wishlist')
                return
              }
              const isWishlisted = wishlistItems.some(item => item.id === product.id)
              isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)
            }}>
              {wishlistItems.some(item => item.id === product.id) ? (
                <BsHeartFill className="w-8 h-8 text-red-500" />
              ) : (
                <FiHeart className="w-8 h-8 text-gray-400 hover:text-red-500 transition-colors" />
              )}
            </div>

            <div className="flex items-center mb-4 space-x-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <FiStar
                    key={star}
                    className={`w-5 h-5 ${star <= Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">({product.rating.count} reviews)</span>
              </div>
              <span className={`text-sm ${product.rating.rate > 3 ? 'text-green-600' : 'text-red-600'}`}>
                {product.rating.rate > 3 ? 'Good' : 'Average'}
              </span>
            </div>

            <p className="text-2xl font-bold text-gray-900 mb-4">${product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center mb-6 space-x-4">
  <span className="font-medium text-gray-800">Quantity:</span>

  <div className="flex items-center rounded-full shadow-md border border-gray-200 bg-white overflow-hidden">
    {/* Minus Button */}
    <button
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-500 active:bg-red-100 transition-colors"
    >
      <FiMinus className="w-4 h-4" />
    </button>

    {/* Quantity Display */}
    <span className="px-6 py-2 text-gray-900 font-semibold select-none">
      {quantity}
    </span>

    {/* Plus Button */}
    <button
      onClick={() => setQuantity(quantity + 1)}
      className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 active:bg-green-100 transition-colors"
    >
      <FiPlus className="w-4 h-4" />
    </button>
  </div>
</div>


            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <ProductCarousel products={relatedProducts} />
          </div>
        )}

        {/* Arrow Up Icon */}
        <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-3 md:p-4 rounded-full shadow-lg z-50">
          <FiArrowUp size={20} className="md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
