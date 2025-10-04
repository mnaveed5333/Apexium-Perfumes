class AuthService {
  // Store token in localStorage
  setToken(token) {
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('auth_token')
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken()
  }

  // Login user (mocked)
  async login(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock successful login
    const mockUser = {
      id: 1,
      email: email,
      name: email.split('@')[0],
      avatar: null
    }
    const mockToken = 'mock-jwt-token-' + Date.now()

    this.setToken(mockToken)
    localStorage.setItem('user', JSON.stringify(mockUser))

    return mockUser
  }

  // Register user (mocked)
  async register(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock successful registration
    const mockUser = {
      id: Date.now(),
      email: userData.email,
      name: userData.name || userData.email.split('@')[0],
      avatar: null
    }
    const mockToken = 'mock-jwt-token-' + Date.now()

    this.setToken(mockToken)
    localStorage.setItem('user', JSON.stringify(mockUser))

    return mockUser
  }

  // Logout user
  logout() {
    this.setToken(null)
    localStorage.removeItem('user')
  }

  // Get user profile (from localStorage)
  async getProfile() {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated')
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))

    const userData = localStorage.getItem('user')
    if (!userData) {
      throw new Error('User data not found')
    }

    return JSON.parse(userData)
  }

  // Update user profile (mocked)
  async updateProfile(profileData) {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated')
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    const updatedUser = { ...currentUser, ...profileData }

    localStorage.setItem('user', JSON.stringify(updatedUser))

    return updatedUser
  }
}

export const authService = new AuthService()