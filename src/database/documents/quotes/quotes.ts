import { Collections } from "../../collections";
import { getAllDocumentsRefsAndData } from "../../queries";

export const getAllQuotes = async () => {
  const quotes = await getAllDocumentsRefsAndData(Collections.QUOTES);
  return quotes;
};
