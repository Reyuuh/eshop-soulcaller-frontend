const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';


export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error('Kunde inte hämta produkter');
  }
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) {
    throw new Error('Kunde inte hämta produkten');
  } 
    return res.json();
}

export async function createProduct(productData) {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

    if (!res.ok) {
    throw new Error('Kunde inte skapa produkten');
  }
    return res.json();
}

export async function updateProduct(id, productData) {
  const res = await fetch(`${API_URL}/products/${id}`, {
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
  const res = await fetch(`${API_URL}/products/${id}`, {
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


//hjälpmedel

async function fetchJSON(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options,
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  return res.json();
}