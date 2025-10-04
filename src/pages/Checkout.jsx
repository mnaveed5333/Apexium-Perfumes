import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCreditCard, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/checkout/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Checkout = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Get cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)

    // Calculate total
    const total = savedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    // Create payment intent (mocked)
    const createPaymentIntent = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        // Mock client secret for Stripe
        const mockClientSecret = 'pi_mock_' + Date.now() + '_secret_' + Math.random().toString(36).substring(2)
        setClientSecret(mockClientSecret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
      } finally {
        setLoading(false)
      }
    }

    if (total > 0) {
      createPaymentIntent()
    } else {
      setLoading(false)
    }
  }, [])

  const appearance = {
    theme: 'stripe',
  }

  const options = {
    clientSecret,
    appearance,
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <FiArrowLeft />
              Back to Cart
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiTruck className="text-green-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiShield className="text-blue-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiCreditCard className="text-purple-600" />
                  <span>Multiple payment options</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>

              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
