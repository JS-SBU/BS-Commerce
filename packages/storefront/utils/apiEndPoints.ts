export const apiEndPoints = {
  getUser: `/todos`,
  getSignedInUser: `/customer/auth`,
  getPublicProducts: '/customer/products',
  getProducts: '/products',
  register: '/customer/auth/register',
  login: '/customer/auth/sign-in',
  getCart: `/cart`,
  deleteCartItem: `/cart/item`,
  deleteAllCartItem: '/cart/allitems',
  updateCartItem: `/cart/item`,
  getCatagoryList: `/category`,
  order: `/customer/order`,
  addToWishList: `/wishlist`,
  getCustomerWishlist: `/wishlist`,
  deleteWishlistItem: `wishlist/items`,
  deleteFullWishlist: `/wishlist/allitems`,
  addToCompare: `/compare`,
  deleteFromCompare: `/compare/item`,
  getCustomerProfile: `/customer`,
  addCustomerAddress: `/customer/add-address`,
  updateCustomerAddress: `/customer/update-address`,
  deleteCustomerAddress: `/customer/delete-address`,
  customer: '/customer',
};