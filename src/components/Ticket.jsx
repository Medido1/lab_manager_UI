import phoneIcon from '/telephone.png';

function Ticket() {

  const currentDay = new Date().toLocaleDateString(`fr-FR`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`
  })

  return (
    <div 
      className="print-ticket bg-white p-4 py-8 flex 
      flex-col gap-2 items-center rounded-md shadow-md"
    >
      <h1 className="text-center">
        Laboratoire D'analyse Médical Dr Gherib
      </h1>
      <p>
        د. غريب اسماعيل 
      </p>
      <p>
      طبيب اخصائي
      </p>
      <div className="flex items-center gap-2 mb-2">
        <img src={phoneIcon} className="w-5" alt="phone icon" />
        <p>06.96.10.02.00</p>
      </div>
      <div className="flex justify-between self-stretch items-center">
        <p className="text-lg">
          {currentDay}
        </p>
        <p className="text-xl">
          Anapath
        </p>
        <p className="text-2xl font-bold">
          10
        </p>
      </div>
      <p className="text-2xl text-center my-2 font-bold ">
          Mehdi Bousalah
      </p>
      <div className="self-start flex gap-4">
        <p>
          Prix Total:
        </p>
        <p>
          2000DA
        </p>
      </div>
      <div className="self-start flex gap-4">
        <p>
          Prix Payée:
        </p>
        <p>
          2000DA
        </p>
      </div>
      <div className="self-start flex items-center gap-4">
        <p>
          Reste a payer:
        </p>
        <p className="font-bold text-2xl">
          1000DA
        </p>
      </div>
      <p className="text-sm text-center">
        وراء محكمة الوئام مقابل مسجد عبدالله بن عمر ـ الأغواط ـ
      </p>
    </div>
  )
}

export default Ticket;