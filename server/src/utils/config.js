export default function getBaseUrl(req) {
  return `${req.protocol}://${req.get("host")}`;
}
