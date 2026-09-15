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
        // Agregamos el BOM (\uFEFF) para Excel y convertimos todo a Base64
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
                subject: `Resultados del Experimento - ${participante}`,
                html: `<p>Hola, adjunto los resultados de <strong>${participante}</strong>.</p>`,
                attachments: [
                    {
                        filename: `resultados-${participante}.csv`,
                        content: base64CSV // Enviado de forma segura en Base64
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