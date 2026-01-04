import deleteIcon from '/delete.png';
import editIcon from '/edit.png';

function ClientTableMain({data}){
  return (
    <main  className="bg-gray-200 p-4">
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
                  <button>
                    <img src={deleteIcon} alt="delete client" className='h-4'/>
                  </button>
                  <button>
                    <img src={editIcon} alt="edit client" className='h-4' />
                  </button>
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
    </main>
  )
}

export default ClientTableMain;