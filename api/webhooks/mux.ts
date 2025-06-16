const prisma = require('../../backend/src/services/prismaService');

module.exports = async (req, res) => {
  const event = req.body;

  if (event.type === 'video.upload.asset_created') {
    const { asset_id, upload_id } = event.data;
    try {
      await prisma.video.update({
        where: { muxUploadId: upload_id },
        data: { muxAssetId: asset_id },
      });
    } catch (error) {
      // log error
    }
  }

  if (event.type === 'video.asset.ready') {
    const { id: assetId, playback_ids } = event.data;
    try {
      const playbackId = playback_ids && playback_ids.length > 0 ? playback_ids[0].id : null;
      if (!playbackId) throw new Error('No playbackId found');
      await prisma.video.update({
        where: { muxAssetId: assetId },
        data: { muxPlaybackId: playbackId },
      });
    } catch (error) {
      // log error
    }
  }

  res.status(200).json({ received: true });
}; 