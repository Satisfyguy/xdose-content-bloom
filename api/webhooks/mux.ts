const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

// Singleton pattern pour PrismaClient
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Vérifier la signature du webhook Mux
function verifyMuxWebhookSignature(req: any, secret: string) {
  const signature = req.headers['mux-signature'];
  if (!signature) return false;

  const timestamp = signature.split(',')[0].split('=')[1];
  const signatureHash = signature.split(',')[1].split('=')[1];

  const payload = `${timestamp}.${JSON.stringify(req.body)}`;
  const expectedHash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return signatureHash === expectedHash;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Vérifier la signature du webhook
    const isValid = verifyMuxWebhookSignature(
      req,
      process.env.MUX_WEBHOOK_SECRET || ''
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { type, data } = req.body;

    // Gérer les différents types d'événements Mux
    switch (type) {
      case 'video.asset.created':
        // La vidéo a été créée
        await prisma.video.update({
          where: { muxAssetId: data.id },
          data: { status: 'PROCESSING' },
        });
        break;

      case 'video.asset.ready':
        // La vidéo est prête à être lue
        await prisma.video.update({
          where: { muxAssetId: data.id },
          data: { status: 'READY' },
        });
        break;

      case 'video.asset.errored':
        // Une erreur s'est produite lors du traitement
        await prisma.video.update({
          where: { muxAssetId: data.id },
          data: { 
            status: 'ERROR',
            error: data.errors?.messages?.join(', ') || 'Unknown error'
          },
        });
        break;

      default:
        console.log('Unhandled webhook event:', type);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}; 