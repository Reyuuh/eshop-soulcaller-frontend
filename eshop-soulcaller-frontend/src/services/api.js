const API_URL = 'http://localhost:8080/';

//USERS

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    if(!response.ok){
        throw new Error('Failed to register user')
    }
    return await response.json()
}

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
    if(!response.ok){
        const errorData = await response.json()
        console.error('Login error response:', errorData)
        throw new Error(errorData.message || 'Failed to login')
    }
    return await response.json()
}

// PRODUKTER

export const getProducts = async () => {
    const response = await fetch(`${API_URL}products/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if(!response.ok){
        throw new Error('Failed to fetch products')
    }
    return await response.json()
}

export const getProductById = async (id) => {
    if (!id) throw new Error('Product id is required')
    const response = await fetch(`${API_URL}products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if(!response.ok){
        throw new Error('Failed to fetch product')
    }
    return await response.json()
}

// export async function fetchProducts() {
//   const res = await fetch(`${API_URL}/products`);
//   if (!res.ok) {
//     throw new Error('Kunde inte hämta produkter');
//   }
//   return res.json();
// }

// export async function fetchProductById(id) {
//   const res = await fetch(`${API_URL}/products/${id}`);
//     if (!res.ok) {
//     throw new Error('Kunde inte hämta produkten');
//   } 
//     return res.json();
// }

export async function createProduct(product) {
  const res = await fetch(`${API_URL}products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Create product failed:", res.status, text);
    throw new Error(`Kunde inte skapa produkten`);
  }

  return res.json();
}

export async function updateProduct(id, productData) {
  const res = await fetch(`${API_URL}products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

    if (!res.ok) {
    throw new Error('Kunde inte uppdatera produkten');
  }
    return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}products/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    let msg = `Kunde inte ta bort produkten (status ${res.status})`;

    try {
      const data = await res.json();
      if (data?.message) msg += `: ${data.message}`;
    } catch {
      // ignore JSON parse error
    }

    throw new Error(msg);
  }

  if (res.status === 204) {
    return { success: true };
  }

  try {
    return await res.json();
  } catch {
    return { success: true };
  }
}


// KATEGORIER
export async function fetchCategories() {
  const res = await fetch(`${API_URL}categories`);
  if (!res.ok) {
    throw new Error('Kunde inte hämta kategorier');
  }
  return res.json();
}

export async function fetchCategoryById(id) {
  const res = await fetch(`${API_URL}categories/${id}`);
    if (!res.ok) {
    throw new Error('Kunde inte hämta kategorin');
  }
    return res.json();
}

export async function createCategory(category) {
  const res = await fetch(`${API_URL}categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) {
    throw new Error('Kunde inte skapa kategorin');
  }
  return res.json();
}

export async function updateCategory(id, categoryData) {
  const res = await fetch(`${API_URL}categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
    if (!res.ok) {
    throw new Error('Kunde inte uppdatera kategorin');
  }
    return res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_URL}categories/${id}`, {
    method: "DELETE",
  });

  if (!res.ok && res.status !== 204) {
    let msg = `Kunde inte ta bort kategorin (status ${res.status})`;

    try {
      const data = await res.json();
      if (data?.message) msg += `: ${data.message}`;
    } catch {
        // ignore JSON parse error
    }

    throw new Error(msg);
  }

  return { success: true };
}


//Orders
export async function fetchOrders() {
  const res = await fetch(`${API_URL}orders`);
  if (!res.ok) {
    throw new Error('Kunde inte hämta orders');
  }
  return res.json();
}

export async function fetchOrderById(id) {
  const res = await fetch(`${API_URL}orders/${id}`);
    if (!res.ok) {
    throw new Error('Kunde inte hämta ordern');
  }
    return res.json();
}

export async function updateOrder(id, orderData) {
  const res = await fetch(`${API_URL}orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error('Kunde inte uppdatera ordern');
  }

  return res.json();
}

export async function deleteOrder(id) {
  const res = await fetch(`${API_URL}orders/${id}`, {
    method: "DELETE",
  });

  if (!res.ok && res.status !== 204) {
    let msg = `Kunde inte ta bort ordern (status ${res.status})`;

    try {
      const data = await res.json();
      if (data?.message) msg += `: ${data.message}`;
    } catch {
      // ignore JSON parse error
    }   

    throw new Error(msg);
  }

  return { success: true };
}

export const createPaymentIntent = async (amount, orderId) => {
    const response = await fetch(`${API_URL}payments/create-intent/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, orderId })
    });
    if (!response.ok) throw new Error('Failed to create payment intent');
    return await response.json();
};

export const processPayment = async (paymentData) => {
    const response = await fetch(`${API_URL}payments/process/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
    });
    if (!response.ok) throw new Error('Payment processing failed');
    return await response.json();
};

//hjälpmedel

// async function fetchJSON(path, options = {}) {
//   const res = await fetch(`${API_URL}${path}`, {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     ...options,
//   });

//   if (!res.ok) throw new Error(`API error: ${res.status}`);

//   return res.json();
// }

