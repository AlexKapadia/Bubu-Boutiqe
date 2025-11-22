// Shopify Theme JavaScript
// Cart functionality using Shopify Cart API

class BuBuCart {
  constructor() {
    this.init();
  }

  async init() {
    await this.updateCartCount();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-add-to-cart]')) {
        e.preventDefault();
        const button = e.target.closest('[data-add-to-cart]');
        const variantId = button.dataset.variantId;
        const quantity = parseInt(button.dataset.quantity) || 1;
        this.addToCart(variantId, quantity);
      }
    });

    // Cart drawer toggle
    const cartToggle = document.querySelector('[data-cart-toggle]');
    if (cartToggle) {
      cartToggle.addEventListener('click', () => {
        this.toggleCartDrawer();
      });
    }

    // Close cart drawer
    const cartClose = document.querySelector('[data-cart-close]');
    if (cartClose) {
      cartClose.addEventListener('click', () => {
        this.closeCartDrawer();
      });
    }
  }

  async addToCart(variantId, quantity = 1) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            id: variantId,
            quantity: quantity
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        await this.updateCartCount();
        await this.updateCartDrawer();
        this.openCartDrawer();
        this.showNotification('Item added to cart!');
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showNotification('Error adding item to cart', 'error');
    }
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      const count = cart.item_count || 0;
      
      const countElements = document.querySelectorAll('[data-cart-count]');
      countElements.forEach(el => {
        el.textContent = count;
      });
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  async updateCartDrawer() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      const drawer = document.querySelector('[data-cart-drawer]');
      if (!drawer) return;

      if (cart.items.length === 0) {
        drawer.innerHTML = `
          <div class="text-center py-20 text-gray-500">
            <p class="text-lg">Your cart is empty</p>
          </div>
        `;
        return;
      }

      let html = '';
      cart.items.forEach(item => {
        html += `
          <div class="flex gap-4 mb-6 pb-6 border-b border-purple-200">
            <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded">
            <div class="flex-1">
              <h4 class="font-bold mb-1">${item.title}</h4>
              <p class="text-sm text-gray-600 mb-2">$${(item.price / 100).toFixed(2)}</p>
              <div class="flex items-center gap-2">
                <button onclick="cart.updateQuantity(${item.variant_id}, ${item.quantity - 1})" class="w-6 h-6 rounded bg-purple-100 hover:bg-purple-200 flex items-center justify-center">-</button>
                <span>${item.quantity}</span>
                <button onclick="cart.updateQuantity(${item.variant_id}, ${item.quantity + 1})" class="w-6 h-6 rounded bg-purple-100 hover:bg-purple-200 flex items-center justify-center">+</button>
                <button onclick="cart.removeFromCart(${item.variant_id})" class="ml-auto text-red-500 hover:text-red-400">Remove</button>
              </div>
            </div>
          </div>
        `;
      });

      html += `
        <div class="p-6 border-t border-purple-200">
          <div class="flex justify-between items-center mb-6">
            <span class="text-xl font-bold">TOTAL</span>
            <span class="text-2xl font-black">$${(cart.total_price / 100).toFixed(2)}</span>
          </div>
          <a href="/cart" class="block w-full py-4 bg-gradient-to-r from-purple-400 to-purple-300 hover:from-purple-500 hover:to-purple-400 rounded-lg font-bold transition-all duration-300 text-center text-white">
            CHECKOUT
          </a>
        </div>
      `;

      drawer.innerHTML = html;
    } catch (error) {
      console.error('Error updating cart drawer:', error);
    }
  }

  async updateQuantity(variantId, newQuantity) {
    if (newQuantity <= 0) {
      await this.removeFromCart(variantId);
      return;
    }

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: newQuantity
        })
      });

      if (response.ok) {
        await this.updateCartCount();
        await this.updateCartDrawer();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  async removeFromCart(variantId) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 0
        })
      });

      if (response.ok) {
        await this.updateCartCount();
        await this.updateCartDrawer();
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  toggleCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer-container]');
    if (drawer) {
      drawer.classList.toggle('open');
    }
  }

  openCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer-container]');
    if (drawer) {
      drawer.classList.add('open');
      this.updateCartDrawer();
    }
  }

  closeCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer-container]');
    if (drawer) {
      drawer.classList.remove('open');
    }
  }

  showNotification(message, type = 'success') {
    // Simple notification - can be enhanced
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 px-6 py-4 rounded-lg shadow-lg z-50 ${
      type === 'error' ? 'bg-red-500' : 'bg-purple-500'
    } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize cart when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cart = new BuBuCart();
  });
} else {
  window.cart = new BuBuCart();
}

