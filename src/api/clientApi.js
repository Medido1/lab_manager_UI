const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:8000"
  : "https://192.168.56.1:8000"

export const checkAsCompleted = async (id, setMessage, refreshData, checked) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No auth token found');
    return
  }
  try {
    const res = await fetch(`${API_BASE_URL}/clients/${id}/update`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sortie: checked })
    })

    const data = await res.json();
    setMessage(data.message)
    refreshData();
  } catch (error) {
    console.error(error);
  }
}

export const deleteClient = async (id, setMessage, refreshData) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No auth token found');
    return;
  }

  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
    try {
      const res = await fetch(`${API_BASE_URL}/clients/${id}/delete`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "'Erreur lors de la suppression'");
        return;
      }
      
      setMessage(data.message);
      refreshData();
    } catch (error) {
      console.error(error);
    }
  }
};

export const getFullData = async (setMessage) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No auth token found');
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}0/clients/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "'Erreur fetching data");
      return
    }
    return data;
  } catch (error) {
    console.error(error)
  }
}

export const importData = async (excelData) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No auth token found');
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/clients/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(excelData) 
    })

     const data = await res.json();

    if (!res.ok) {
      console.error('Failed to save data:', data.message || 'Unknown error');
      return null;
    }
    return data; 
  } catch (error) {
    console.error(error)
  }
}

export const updateClient = async(clientData, refreshData, setShowForm) => {
  const token = localStorage.getItem('authToken');

  try {
    const res = await fetch(`${API_BASE_URL}/clients/${clientData.id}/edit`, {
      method: "put",
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clientData)
    })
    if (res.ok) {
      refreshData();
      setShowForm(false);
    }
  } catch (error) {
    console.error(error)
  }
}

export const addClientAPI = async(newClient, refreshData, cancelInput) => {
  const token = localStorage.getItem('authToken');
  try {
    const res = await fetch(`${API_BASE_URL}/clients/add`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newClient)
    })
    if (res.ok) {
      refreshData();
    }
    cancelInput();
  } catch (error) {
    console.error(error)
  }
};

export const addMultipleClientsAPI = async(clientList, refreshData, cancelInput) => {
  const token = localStorage.getItem('authToken');
  try {
    const res = await fetch(`${API_BASE_URL}/clients/add/multi`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(clientList)
    })
    if (res.ok) {
      refreshData();
    }
    cancelInput();
  } catch (error) {
    console.error(error)
  }
}
