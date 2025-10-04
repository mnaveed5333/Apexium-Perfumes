import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { FiCreditCard, FiCheck } from 'react-icons/fi'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    })

    if (error) {
      setMessage(error.message)
      setIsProcessing(false)
    } else {
      setMessage('Payment succeeded!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('succeeded')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
          !stripe || isProcessing
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
        }`}
        whileHover={!isProcessing ? { scale: 1.02 } : {}}
        whileTap={!isProcessing ? { scale: 0.98 } : {}}
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <FiCreditCard />
            Pay Now
          </>
        )}
      </motion.button>

      <div className="text-center text-sm text-gray-600">
        <p>Your payment information is secure and encrypted.</p>
      </div>
    </form>
  )
}

export default CheckoutForm
