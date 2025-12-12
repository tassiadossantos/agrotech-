import OpenAI from "openai";

// Only initialize if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const SYSTEM_PROMPT = `Você é o AgroGPT, um assistente de inteligência artificial especializado em agricultura brasileira. 
Você ajuda produtores rurais com:
- Análise de clima e previsões para plantio/colheita
- Cotações de commodities (soja, milho, café, algodão, etc.)
- Recomendações de manejo de culturas
- Gestão de maquinário agrícola
- Análise financeira de safras
- Melhores práticas agrícolas sustentáveis

Seja conciso, prático e use dados quando disponíveis. Sempre responda em português brasileiro.
Use emojis quando apropriado para tornar a conversa mais amigável.
Quando não souber algo com certeza, seja honesto sobre isso.`;

export interface ChatContext {
  farmName?: string;
  farmLocation?: string;
  activeCrops?: string[];
  weather?: {
    temp: number;
    condition: string;
    humidity: number;
  };
  marketPrices?: Array<{
    commodity: string;
    price: number;
    variation: number;
  }>;
}

export async function generateChatResponse(
  message: string,
  context?: ChatContext,
  history: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<string> {
  if (!openai) {
    console.warn("⚠️ OpenAI API key not configured, using mock responses");
    return getMockResponse(message);
  }

  try {
    // Build context message
    let contextMessage = "";
    if (context) {
      contextMessage = "\n\nContexto atual:";
      if (context.farmName) contextMessage += `\n- Fazenda: ${context.farmName} (${context.farmLocation})`;
      if (context.activeCrops?.length) contextMessage += `\n- Culturas ativas: ${context.activeCrops.join(", ")}`;
      if (context.weather) {
        contextMessage += `\n- Clima: ${context.weather.temp}°C, ${context.weather.condition}, ${context.weather.humidity}% umidade`;
      }
      if (context.marketPrices?.length) {
        contextMessage += "\n- Cotações: " + context.marketPrices.map(p => 
          `${p.commodity}: R$${p.price} (${p.variation > 0 ? "+" : ""}${p.variation}%)`
        ).join(", ");
      }
    }

    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT + contextMessage },
      ...history.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "Desculpe, não consegui processar sua mensagem.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return getMockResponse(message);
  }
}

// Mock responses for development without API key
function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("clima") || lowerMessage.includes("tempo") || lowerMessage.includes("chuva")) {
    return `🌤️ **Análise Climática**

Com base nos dados da sua região, identifiquei:
- Temperatura: 28-32°C nos próximos dias
- Probabilidade de chuva: 45% para amanhã
- Umidade relativa: adequada para a maioria das culturas

**Recomendação:** Janela favorável para aplicação de defensivos nas próximas 48h, antes da previsão de precipitação.`;
  }

  if (lowerMessage.includes("soja") || lowerMessage.includes("milho") || lowerMessage.includes("preço") || lowerMessage.includes("cotação")) {
    return `📊 **Análise de Mercado**

Cotações atuais:
- **Soja:** R$ 142,00/sc (+5.2%)
- **Milho:** R$ 58,50/sc (-1.2%)

**Tendência:** Mercado de soja em alta devido à demanda chinesa. Milho pressionado pela safra americana.

**Sugestão:** Considere travar parte da produção de soja nos níveis atuais.`;
  }

  if (lowerMessage.includes("plantio") || lowerMessage.includes("plantar")) {
    return `🌱 **Recomendação de Plantio**

Analisando dados do mercado e clima:

📌 **Recomendação: PLANTAR**
- Janela ideal: 18 a 25 de Outubro
- Previsão de La Niña fraca favorece
- Lucro estimado: +R$ 4.200/ha

⚠️ **Atenção:** Verifique a umidade do solo antes do plantio.`;
  }

  if (lowerMessage.includes("máquina") || lowerMessage.includes("trator") || lowerMessage.includes("colheitadeira")) {
    return `🚜 **Status do Maquinário**

Baseado nos dados registrados:
- John Deere 7230J: Operacional (78% combustível)
- New Holland CR 9.90: Disponível
- Jacto Uniport 3030: **Em manutenção**

**Alerta:** O pulverizador precisa de revisão das barras antes da próxima aplicação.`;
  }

  return `🤖 Olá! Sou o AgroGPT, seu assistente agrícola inteligente.

Posso ajudar com:
- 🌤️ Análise de clima e previsões
- 📊 Cotações de commodities
- 🌱 Recomendações de plantio
- 🚜 Gestão de maquinário
- 💰 Análise financeira

O que você gostaria de saber?`;
}

// Specialized analysis functions
export async function analyzeWeatherForPlanting(
  cropName: string,
  forecast: Array<{ date: string; temp: number; humidity: number; rainProbability: number }>
): Promise<string> {
  const prompt = `Analise as condições climáticas dos próximos dias para plantio de ${cropName}:
${forecast.map(f => `${f.date}: ${f.temp}°C, ${f.humidity}% umidade, ${f.rainProbability}% chance de chuva`).join("\n")}

Forneça uma recomendação curta sobre a janela ideal de plantio.`;

  return generateChatResponse(prompt);
}

export async function analyzeMarketTrend(
  commodity: string,
  history: Array<{ date: string; price: number }>
): Promise<string> {
  const prompt = `Analise a tendência de preços de ${commodity} nos últimos ${history.length} dias:
Preço inicial: R$ ${history[0]?.price}
Preço atual: R$ ${history[history.length - 1]?.price}
Variação: ${(((history[history.length - 1]?.price || 0) - (history[0]?.price || 0)) / (history[0]?.price || 1) * 100).toFixed(2)}%

Forneça uma análise curta da tendência e recomendação.`;

  return generateChatResponse(prompt);
}
