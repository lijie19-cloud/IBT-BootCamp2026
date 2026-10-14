import { demoOrder } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const demoStatuses = ["On the way", "Delivered"];

export async function GET(request, { params }) {
  const { id } = await params;
  if (id !== demoOrder.id) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const encoder = new TextEncoder();
  let index = Math.max(0, demoStatuses.indexOf(demoOrder.status));

  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      let timer;

      function close() {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        request.signal.removeEventListener("abort", close);
        try { controller.close(); } catch { /* Connection already closed. */ }
      }

      function send(data) {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          close();
        }
      }

      function sendStatus() {
        if (closed) return;
        const currentStatus = demoStatuses[index];
        send({ orderId: id, status: currentStatus, updatedAt: new Date().toISOString() });
        if (currentStatus === "Delivered") {
          close();
        } else {
          index = Math.min(index + 1, demoStatuses.length - 1);
        }
      }

      sendStatus();
      if (!closed) timer = setInterval(sendStatus, 5000);
      request.signal.addEventListener("abort", close, { once: true });
    },
    cancel() { /* Request abort listener handles cleanup. */ }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    }
  });
}
