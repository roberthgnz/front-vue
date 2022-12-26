import { fetcher } from "../../utils/fetcher.js";

export default async function handler(req, res) {
  const params = new URLSearchParams(req.query);
  const { data } = await fetcher(
    `cryptocurrency/listings/latest?${params.toString()}`
  );
  res.status(200).json(data);
}
