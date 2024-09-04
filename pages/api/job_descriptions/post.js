export default async function handler(req, res) {
    console.log("body", req.body)
    const api_url = "https://2x5cqoqml7.execute-api.us-east-1.amazonaws.com/dev/"
    try {
        if (req.method === 'POST') {
            const response = await fetch(`${api_url}`, {
                method: 'POST',
                body: JSON.stringify(req.body),
                headers: { 
                    'Accept': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to post files: ${response.statusText}`);
            }
            const data = await response.json();
            res.status(200).json(data);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    }
    catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: `Failed to process request: ${error.message}` });
    }
}