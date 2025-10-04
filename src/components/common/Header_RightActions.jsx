{`{/* Right actions */}
<div className="flex items-center gap-1 xs:gap-2 sm:gap-3">

  {/* Search button (mobile) */}
  {!showFullNav && (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsSearchOpen(true)}
      className="p-1.5 xs:p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
      aria-label="Search"
    >
      <FiSearch size={showMinimalUI ? 18 : 20} className="text-black hover:text-gray-900" />
    </motion.button>
  )}

  {/* Wishlist */}
  <Link
    to="/wishlist"
    className="p-1.5 xs:p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
    aria-label="Wishlist"
  >
    <FiHeart size={showMinimalUI ? 18 : 20} className="text-black hover:text-gray-900" />
  </Link>

  {/* Cart with badge */}
  <Link
    to="/cart"
    className="relative p-1.5 xs:p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
    aria-label="Cart"
  >
    <FiShoppingCart size={showMinimalUI ? 18 : 20} className="text-black hover:text-gray-900" />
    {cartCount > 0 && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 600, damping: 15 }}
        className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 xs:h-5 xs:w-5 flex items-center justify-center shadow-sm"
        aria-live="polite"
        aria-label={`${cartCount} items in cart`}
      >
        {cartCount > 9 ? '9+' : cartCount}
      </motion.span>
    )}
  </Link>

  {/* User dropdown / auth links */}
  {user ? (
    windowWidth >= 475 && (
      <div className="relative">
        <motion.button
          ref={accountBtnRef}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAccountOpen((s) => !s)}
          className="hidden sm:flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1.5 rounded-lg border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="User menu"
          aria-haspopup="true"
          aria-expanded={isAccountOpen}
        >
          <FiUser size={showMinimalUI ? 16 : 18} className="text-black hover:text-gray-900" />
          {windowWidth >= 768 && (
            <>
              <span className="text-sm font-medium text-black">{user.name || 'Account'}</span>
              <FiChevronDown size={14} className="text-gray-500" />
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {isAccountOpen && (
            <motion.div
              ref={accountDropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-1.5 z-50"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              role="menu"
              aria-label="Account menu"
            >
              {[{ to: '/account', label: 'My Account' }, { to: '/orders', label: 'Orders' }].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsAccountOpen(false)}
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                  role="menuitem"
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                role="menuitem"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  ) : windowWidth >= 475 ? (
    <div className="hidden sm:flex items-center gap-2 xs:gap-3">
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/login"
          className="text-sm text-black hover:text-gray-900 font-medium border border-transparent hover:border-blue-500 transition-all duration-300 px-2 py-1 rounded-md"
        >
          Login
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/register"
          className="px-3 xs:px-4 py-1.5 bg-black text-white rounded-lg text-sm font-medium shadow-md hover:bg-gray-800 border border-transparent hover:border-blue-500 transition-all duration-300"
        >
          Register
        </Link>
      </motion.div>
    </div>
  ) : null}

  {/* Mobile hamburger menu */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setIsMenuOpen((s) => !s)}
    className="p-1.5 xs:p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isMenuOpen}
  >
    {isMenuOpen ? (
      <CloseIcon size={showMinimalUI ? 18 : 20} className="text-black" />
    ) : (
      <HamburgerIcon size={showMinimalUI ? 18 : 20} className="text-black" />
    )}
  </motion.button>
</div>
`}
