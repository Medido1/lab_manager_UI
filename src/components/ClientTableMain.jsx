import deleteIcon from '/delete.png';
import editIcon from '/edit.png';
import uploadIcon from '/file.png';
import { checkAsCompleted, deleteClient, uploadFile } from '../api/clientApi';
import { useContext, useState } from 'react';
import { DataContext} from '../context/DataContext'
import EditForm from './EditForm';
import Ticket from './Ticket';
import { PrintContext } from '../context/PrintContext';

function ClientTableMain({data, type}){
  const {ticketRef} = useContext(PrintContext);
  const [message, setMessage] = useState("");
  const {refreshData} = useContext(DataContext);
  const [formData, setFormData] = useState({});

  const [showForm, setShowForm] = useState(false);

  function updateClient(client) {
    setFormData(client);
    setShowForm(true);
  }

  async function handleFileUpload(e, id) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      await uploadFile(selectedFile, refreshData, id);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file. Please try again.');
    }
  }

  return (
    <main  className="bg-gray-200 p-4 flex-grow">
      <table className="min-w-full border-2 bg-white border-blue-400 text-black">
        <thead className="bg-blue-400">
          <tr>
            <th>Date</th>
            <th>Numero</th>
            <th>Sortie</th>
            <th>Nom</th>
            <th>Prix Total</th>
            <th>Reste a payé</th>
            <th>Telephone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((client) => (
            <tr key={client.id}>
              <td className="p-2 border text-center">
                <div className='flex flex-col sm:flex-row gap-4 items-center'>
                  <button
                    onClick={() => deleteClient(client.id, setMessage, refreshData)}
                  >
                    <img src={deleteIcon} alt="delete client" className='h-4'/>
                  </button>
                  <button onClick={() => updateClient(client)}>
                    <img src={editIcon} alt="edit client" className='h-4' />
                  </button>
                  <label htmlFor={`client_file_${client.id}`} className='cursor-pointer'>
                    <img 
                      src={uploadIcon} 
                      alt="upload file" 
                      className='w-[100%] block h-4'
                    />
                  </label>
                  <input 
                    type="file" 
                    className='hidden' 
                      id={`client_file_${client.id}`}  // ← Unique ID per client
                    name='client_file'
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, client.id)}
                  />
                  <p className="order-first sm:order-none">
                    {client.createdAt.split("T")[0]}
                  </p>
                  
                </div>
              </td>
              <td className="p-2 border text-center text-sm sm:w-[7%] sm:text-md">
                {client.number}
              </td>
              <td className="p-2 border text-center">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={client.sortie}
                    onChange={() => checkAsCompleted(client.id, setMessage, refreshData, !client.sortie)}
                  />
                  <span className="checkmark"></span>
                </label>
              </td>
              <td className="p-2 border text-center">{client.fullName}</td>
              <td className="p-2 border text-center w-[12%]">{client.price}DA</td>
              <td
                className={`${
                    client.remaining == 0 ? "bg-green-400" : "bg-red-400"
                  }
                  p-2 border text-center w-[12%]`}
              >
                  {client.remaining}DA
              </td>
              <td className="p-2 border">{client.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && 
        <div>
          <div className="fixed inset-0 bg-black/25 z-40"></div>
          <div className="absolute top-[10%] left-[35%] z-40 p-4 rounded-2xl">
            <EditForm 
              type={type}
              clientData = {formData}
              setClientData = {setFormData}
              setShowForm = {setShowForm}
            />
          </div>
          <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <Ticket
              ref={ticketRef}
              type = {type}
              number = {formData.number}
              fullName = {formData.fullName}
              price = {formData.price}
              payedSum = {formData.price - formData.remaining}
            />
          </div>
        </div>
      }
    </main>
  )
}

export default ClientTableMain;