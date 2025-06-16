const prisma = require('../../backend/src/services/prismaService');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { title, description, tags, tier, creatorId, muxUploadId } = req.body;
      if (!title || !creatorId || !muxUploadId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const video = await prisma.video.create({
        data: {
          title,
          description,
          tags,
          tier,
          creatorId,
          muxUploadId,
          muxAssetId: '',
          muxPlaybackId: '',
        },
      });
      res.status(201).json(video);
    } catch (error) {
      console.error('Error creating video:', error);
      res.status(500).json({ error: error.message || 'Failed to create video' });
    }
    return;
  }

  // GET /api/videos?uploadId=xxx
  if (req.method === 'GET') {
    const { uploadId } = req.query;
    if (!uploadId) return res.status(400).json({ error: 'Missing uploadId' });
    try {
      const video = await prisma.video.findFirst({ where: { muxUploadId: uploadId } });
      if (!video) return res.status(404).json({ error: 'Video not found' });
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch video' });
    }
    return;
  }

  res.status(405).end();
}; 