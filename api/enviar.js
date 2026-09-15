export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { dadosCSV, participante } = req.body;

    try {
        // UNIMOS o BOM (FEFF) para Excel e convertemos a BASE64
        const csvBuffer = Buffer.from('\uFEFF' + dadosCSV, 'utf-8');
        const base64CSV = csvBuffer.toString('base64');

        const respuestaResend = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Pesquisa Task-Switching VISUAL <onboarding@resend.dev>', 
                to: ['bafeppgufcspa@gmail.com'],
                subject: `Resultados do Experimento - ${participante}`,
                html: `<p>Olá! Seguem em anexo os resultados de <strong>${participante}</strong>.</p>`,
                attachments: [
                    {
                        filename: `resultados-${participante}.csv`,
                        content: base64CSV // enviado em base64, agora com os dados bem formatados
                    }
                ]
            })
        });

        if (respuestaResend.ok) {
            res.status(200).json({ success: true });
        } else {
            const erro = await respuestaResend.json();
            res.status(400).json({ error: erro });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}