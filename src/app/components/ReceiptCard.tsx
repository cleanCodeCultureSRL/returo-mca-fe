import Image from 'next/image';

interface ReceiptCardProps {
  receiptNumber: string;
  date: string;
  amount: string;
  retailer: string;
  status: 'disponibile' | 'utilizate' | 'expirate';
}

export default function ReceiptCard({ receiptNumber, date, amount, retailer, status }: ReceiptCardProps) {
  return (
    <div className="bg-white rounded-2xl p-3 border-2 border-black min-w-[280px] flex-shrink-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8  rounded-lg flex items-center justify-center mr-2">
            <Image
              src="/icons/receipt_icon.png"
              alt="Receipt"
              width={20}
              height={20}
              className="h-[32px] w-[26px]"
            />
          </div>
          <div>
            <p className="text-black text-sm text-base font-euclid-semibold">Receipt</p>
            <p className="text-black text-lg font-euclid-bold">{receiptNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-black text-sm font-euclid-regular">{date}</p>
          <p className="text-black text-xl font-euclid-bold">{amount}</p>
        </div>
      </div>

      {/* Horizontal separator */}
      <div className="border-t my-2 border-3 rounded-full" style={{ borderColor: '#D2ECDE' }}></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/icons/retailer_location_icon.png"
            alt="Retailer Location"
            width={16}
            height={16}
            className="w-[13px] h-[15px] mr-2"
          />
          <span className="text-black text-sm font-euclid-bold">{retailer}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-euclid-semibold ${status === 'disponibile' ? 'bg-green-100 text-green-800' :
            status === 'utilizate' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
          }`}>
          {status === 'disponibile' ? 'Disponibil' :
            status === 'utilizate' ? 'Utilizat' :
              'Expirat'}
        </div>
      </div>
    </div>
  );
} 