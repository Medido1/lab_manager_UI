import phoneIcon from '/telephone.png';
import { forwardRef } from "react";

const Ticket = forwardRef(({type, fullName, price, payedSum, number}, ref) => {

  const currentDay = new Date().toLocaleDateString(`fr-FR`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`
  })

  return (
    <div 
      ref={ref}
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
          {type}
        </p>
        <p className="text-2xl font-bold">
          {number}
        </p>
      </div>
      <p className="text-2xl text-center my-2 font-bold ">
          {fullName}
      </p>
      <div className="self-start flex gap-4">
        <p>
          Prix Total:
        </p>
        <p>
          {price}Da
        </p>
      </div>
      <div className="self-start flex gap-4">
        <p>
          Prix Payée:
        </p>
        <p>
          {payedSum}DA
        </p>
      </div>
      <div className="self-start flex items-center gap-4">
        <p>
          Reste a payer:
        </p>
        <p className="font-bold text-2xl">
          {price - payedSum}DA
        </p>
      </div>
      <p className="text-sm text-center">
        وراء محكمة الوئام مقابل مسجد عبدالله بن عمر ـ الأغواط ـ
      </p>
    </div>
  )
})

export default Ticket;