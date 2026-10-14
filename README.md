# Addis Eats — Delivery Tracking

A Next.js App Router demonstration app based on the uploaded Day 47 guide: Leaflet maps, Server-Sent Events (SSE), Ethiopian birr/time formatting, and CSV export/upload validation.

## Requirements
- Node.js 20.9+ (or a Node version supported by your installed Next.js)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and choose **Track order AE-1042**.

## Features
- Interactive Leaflet/OpenStreetMap map with courier and destination markers
- Live demonstration status updates over SSE
- ETB currency formatting and Africa/Addis_Ababa time formatting
- Timestamped order history
- CSV export with quoting and spreadsheet formula-prefix protection
- CSV upload checks for extension and 2 MB size limit

## Important demo limitations
The order, courier coordinates, and status stream are fictional. The stream is not connected to a database or a real courier GPS device. CSV upload validates the file at a basic browser level and previews its text; it does not import orders. Before production use, add authenticated order access, persistent database-backed status history, server-side upload validation, and a suitable map tile provider.

## Main routes
- `/` — landing page
- `/track/AE-1042` — tracking dashboard
- `/api/orders/AE-1042/stream` — SSE demo endpoint
