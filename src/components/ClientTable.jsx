import ClientTableHeader from "./ClientTableHeader";
import ClientTableMain from "./ClientTableMain";

function ClientTable({type, data}) {
  return (
    <div className="flex flex-col flex-grow">
      <ClientTableHeader 
        type={type}
      />
      <ClientTableMain data={data} />
    </div>
  )
}

export default ClientTable;