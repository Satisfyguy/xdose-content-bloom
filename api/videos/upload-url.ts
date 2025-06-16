const { createDirectUpload } = require('../../backend/src/services/muxService');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const upload = await createDirectUpload();
    res.status(200).json({ uploadUrl: upload.url, uploadId: upload.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Mux upload' });
  }
}; 