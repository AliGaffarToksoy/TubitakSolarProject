import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function analyzePanelImage(base64Image: string) {
  const prompt = `
    Analyze this solar panel image for the Tubitak AI CleanBot project. 
    Detect if there is dirt, dust, or kuş pisliği (bird droppings) on the surface.
    Respond strictly in JSON format with the following keys:
    "isDirty": boolean,
    "dirtDensity": number (0-100),
    "recommendation": string (in Turkish, brief advice like "Temizlik programı başlatılmalı" or "Panel temiz, işlem gerekmiyor"),
    "estimatedEfficiencyLoss": number (0-100 percentage)
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64Image.split(',')[1],
                mimeType: 'image/jpeg'
              }
            }
          ]
        }
      ]
    });

    const text = response.text || '';
    // Strip markdown backticks if any
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Gemini analysis failed:', error);
    return {
      isDirty: false,
      dirtDensity: 0,
      recommendation: "Analiz sırasında hata oluştu.",
      estimatedEfficiencyLoss: 0
    };
  }
}
