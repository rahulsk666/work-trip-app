import { Receipt } from "@/module/receipt/schemas/receipt.schema";

export const calculateTotalReceiptAmount = (receipts: Receipt[]) => {
  const total = receipts.reduce((sum, receipt) => {
    return sum + (Number(receipt.amount) ?? 0);
  }, 0);

  return {
    total,
    formatted: `${total.toFixed(2)}`, // change currency symbol as needed
  };
};
