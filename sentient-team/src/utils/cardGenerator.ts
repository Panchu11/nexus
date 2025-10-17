import html2canvas from 'html2canvas';

/**
 * CUSTOM BACKGROUND IMAGE SETUP:
 *
 * To add a custom background image to appreciation cards:
 * 1. Place your image file in: public/card-bg.jpg (or .png)
 * 2. Name it exactly: card-bg.jpg
 * 3. Recommended size: 600x400px or larger
 * 4. The image will automatically be used as the card background
 *
 * Example: public/card-bg.jpg
 */

export interface AppreciationCardData {
  memberName: string;
  message: string;
  xHandle: string;
  date: string;
  memberColor: string;
}

export const generateAppreciationCard = async (
  data: AppreciationCardData
): Promise<string> => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '600px';
  container.style.height = '400px';
  container.style.backgroundColor = '#000000';
  container.style.backgroundImage = 'url(/card-bg.jpg)';
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';
  container.style.padding = '40px';
  container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'space-between';
  container.style.borderRadius = '16px';
  container.style.border = '2px solid #00d9ff';
  container.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.3)';

  // Add overlay for better text readability
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  overlay.style.borderRadius = '16px';
  overlay.style.zIndex = '0';

  // Header
  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '20px';
  header.style.position = 'relative';
  header.style.zIndex = '1';
  header.innerHTML = `
    <div style="font-size: 24px; font-weight: bold; background: linear-gradient(to right, #00d9ff, #ff006e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      Sentient Team Appreciation
    </div>
  `;

  // Content
  const content = document.createElement('div');
  content.style.flex = '1';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.justifyContent = 'center';
  content.style.color = '#ffffff';
  content.style.position = 'relative';
  content.style.zIndex = '1';
  content.innerHTML = `
    <div style="font-size: 18px; color: #00d9ff; margin-bottom: 10px; font-weight: 600;">
      I appreciate <strong>${data.memberName}</strong> for:
    </div>
    <div style="font-size: 16px; color: #e0e0e0; line-height: 1.6; margin-bottom: 20px; font-style: italic;">
      "${data.message}"
    </div>
    <div style="font-size: 14px; color: #a0a0a0;">
      — ${data.xHandle || 'Anonymous'} • ${data.date}
    </div>
  `;

  // Footer
  const footer = document.createElement('div');
  footer.style.textAlign = 'center';
  footer.style.fontSize = '12px';
  footer.style.color = '#888888';
  footer.style.borderTop = '1px solid #333333';
  footer.style.paddingTop = '20px';
  footer.style.position = 'relative';
  footer.style.zIndex = '1';
  footer.innerHTML = `
    <div>sentient-team.vercel.app</div>
  `;

  container.appendChild(overlay);
  container.appendChild(header);
  container.appendChild(content);
  container.appendChild(footer);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      backgroundColor: '#000000',
      scale: 2,
      logging: false,
    });

    const image = canvas.toDataURL('image/png');
    document.body.removeChild(container);
    return image;
  } catch (error) {
    console.error('Error generating card:', error);
    document.body.removeChild(container);
    throw error;
  }
};

export const downloadImage = (imageData: string, filename: string) => {
  const link = document.createElement('a');
  link.href = imageData;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const shareImage = async (imageData: string, memberName: string) => {
  try {
    const blob = await fetch(imageData).then((res) => res.blob());
    const file = new File([blob], `appreciation-${memberName}.png`, {
      type: 'image/png',
    });

    if (navigator.share) {
      await navigator.share({
        title: 'Sentient Team Appreciation',
        text: `I appreciate ${memberName}!`,
        files: [file],
      });
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(imageData);
      alert('Image copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing image:', error);
  }
};

