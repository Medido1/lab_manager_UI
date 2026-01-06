import phoneIcon from '/telephone.png';
import { forwardRef } from "react";
import arrowIcon from '/right-arrow.png';

const Ticket = forwardRef(({
  type, fullName, price, payedSum,
  number, isMultiple, numberOfTests, totalPrice}, ref) => {

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
        {!isMultiple &&
          <p className="text-xl">
            {type}
          </p>
        }
        {!isMultiple && 
          <p className="text-lg font-bold">
          {number}
          </p>
        }
        {isMultiple &&
          <p>{numberOfTests} {type}</p>
        }
      </div>
      <p className="text-2xl text-center my-2 font-bold ">
        {fullName}
      </p>
      {isMultiple && number && numberOfTests > 0 &&
        <p className="text-2xl flex items-center gap-2">
          {number} 
          <img src={arrowIcon} alt="icon" className='h-4' />
          {(parseInt(number) + parseInt(numberOfTests)) - 1}
        </p>
      }
      <div className="self-start flex gap-4">
        <p>
          Prix Total:
        </p>
        <p>
           {isMultiple ? totalPrice ? totalPrice: "" : price}DA
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
          {isMultiple ? totalPrice ? (totalPrice - payedSum): "" : price - payedSum}DA
        </p>
      </div>
      <p className="text-sm text-center">
        وراء محكمة الوئام مقابل مسجد عبدالله بن عمر ـ الأغواط ـ
      </p>
    </div>
  )
})

export default Ticket;