class ApiService {
  constructor() {
    // No base URL needed for mock
  }

  async request(endpoint, options = {}) {
    // Mock all requests to throw error
    throw new Error('API service is disabled in mock mode - all backend calls are mocked')
  }

  // Auth endpoints (mocked)
  async login(credentials) {
    throw new Error('API service is disabled in mock mode')
  }

  async register(userData) {
    throw new Error('API service is disabled in mock mode')
  }

  async getProfile() {
    throw new Error('API service is disabled in mock mode')
  }

  // Product endpoints (mocked)
  async getProducts(params = {}) {
    throw new Error('API service is disabled in mock mode')
  }

  async getProduct(id) {
    throw new Error('API service is disabled in mock mode')
  }

  async getCategories() {
    throw new Error('API service is disabled in mock mode')
  }

  // Order endpoints (mocked)
  async getOrders() {
    throw new Error('API service is disabled in mock mode')
  }

  async createOrder(orderData) {
    throw new Error('API service is disabled in mock mode')
  }

  async createPaymentIntent(amount) {
    throw new Error('API service is disabled in mock mode')
  }

  // Cart endpoints (mocked)
  async getCart() {
    throw new Error('API service is disabled in mock mode')
  }

  async addToCart(item) {
    throw new Error('API service is disabled in mock mode')
  }

  async updateCartItem(itemId, quantity) {
    throw new Error('API service is disabled in mock mode')
  }

  async removeCartItem(itemId) {
    throw new Error('API service is disabled in mock mode')
  }
}

export const apiService = new ApiService()
