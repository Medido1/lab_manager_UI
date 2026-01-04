const token = localStorage.getItem('authToken');

export const checkAsCompleted = async (id, setMessage, refreshData, checked) => {
  if (!token) {
    console.error('No auth token found');
    return
  }
  try {
    const res = await fetch(`http://localhost:8000/clients/${id}/update`, {
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