import Image from 'next/image';

interface TransactionItemProps {
  receiptNumber: string;
  time: string;
  amount: string;
  retailer: string;
}

export default function TransactionItem({ receiptNumber, time, amount, retailer }: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <Image
            src="/icons/receipt_icon.png"
            alt="Receipt"
            width={20}
            height={20}
            className="h-[32px] w-[26px]"
          />
        </div>
        <div>
          <p className="text-black text-lg font-euclid-bold">{retailer}</p>
          <p className="text-gray-600 text-sm font-euclid-regular">{receiptNumber}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-black text-lg font-euclid-bold">{amount}</p>
        <p className="text-gray-600 text-sm font-euclid-regular">{time}</p>
      </div>
    </div>
  );
} 