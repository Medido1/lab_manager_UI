import ClientTableHeader from "./ClientTableHeader";

function ClientTable({type, data}) {
  return (
    <div className="flex-grow">
      <ClientTableHeader 
        type={type}
      />
    </div>
  )
}

export default ClientTable;