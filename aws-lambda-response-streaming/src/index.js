exports.handler = awslambda.streamifyResponse(
    async (event, responseStream, context) => {
        const httpResponseMetadata = {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html",
                "X-Custom-Header": "Example-Custom-Header"
            }
        };

        responseStream = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata);

        const text = "AWS Lambda streaming is awesome!";

        for (let i = 0; i < text.length; i++) {
            const letter = text[i];
            const html = `<span>${letter}</span>`;
            responseStream.write(html);
            await new Promise(r => setTimeout(r, 100));
        }

        responseStream.end();
    }
);
