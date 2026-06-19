export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  return new Response(JSON.stringify({}), {
    headers: {
      "Content-Type": "application/json"
    },
    status: 404
  });
};
