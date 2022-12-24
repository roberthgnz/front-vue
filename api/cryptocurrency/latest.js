import { fetcher } from "../../utils/fetcher.js";

export default async function toHandlerKey(_, res) {
  const { data } = await fetcher("cryptocurrency/listings/latest");
  res.status(200).json(data);
}
