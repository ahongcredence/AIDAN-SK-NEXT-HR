export default async function handler(req, res) {
    const api_url = process.env.API_URL;
    try {
        if (req.method === 'GET') {
            const response = await fetch(`${api_url}`);
            const data = await response.json();
            res.status(200).json(data);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    }
    catch (error) {
        res.status(500).json({ error: `Failed to process request: ${error.message}` });
    }
}