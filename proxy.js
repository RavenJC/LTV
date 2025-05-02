export default async function handler(req, res) {
  const url = req.query.url;
  if (!url || !url.startsWith('http://')) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    const body = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    res.send(Buffer.from(body));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stream' });
  }
}
