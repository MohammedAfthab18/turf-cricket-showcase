import QRCode from "qrcode";

/**
 * DownloadSection — async Server Component.
 *
 * The QR code is generated server-side with `qrcode`'s toDataURL() during
 * render, not client-side in a useEffect. Nothing here needs interactivity,
 * so there's no "use client" boundary and no JS shipped for this section —
 * consistent with the brief's "isolate the client-only piece" pattern used
 * for Hero3D.
 */

const APK_URL = "https://turfcricketmanager.app/downloads/turf-cricket-manager-v1.0.0.apk";
const APK_VERSION = "1.0.0";
const APK_SIZE = "18.4 MB";
const APK_SHA256 =
  "3f9a1c2e7b4d8f605a1e9c3b7d2f4a8e1c6b9d3f7a2e5c8b1d4f7a0e3c6b9d2f";

export default async function DownloadSection() {
  const qrDataUrl = await QRCode.toDataURL(APK_URL, {
    margin: 0,
    width: 176,
    color: { dark: "#0A0D0B", light: "#F5F6F4" },
  });

  return (
    <section id="download" className="mx-auto max-w-4xl px-6 py-24">
      <div className="panel-bezel flex flex-col gap-8 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div className="max-w-sm">
          <h2 className="font-body text-3xl font-semibold text-arena-chalk">
            Get the app
          </h2>
          <p className="mt-3 font-body text-arena-chalk-dim">
            Android, {APK_SIZE}. Works fully offline — install it once and
            score from any ground, net, or basement box.
          </p>

          <a
            href={APK_URL}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-arena-glow px-6 py-3 font-body text-sm font-semibold text-arena-canvas transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arena-chalk"
          >
            Download APK · v{APK_VERSION}
          </a>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 font-body text-xs text-arena-chalk-dim">
            <div>
              <dt className="opacity-70">Requires</dt>
              <dd>Android 8.0+</dd>
            </div>
            <div>
              <dt className="opacity-70">SHA-256</dt>
              <dd className="truncate" title={APK_SHA256}>
                {APK_SHA256.slice(0, 16)}…
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- data: URI, not an optimizable remote asset */}
          <img
            src={qrDataUrl}
            alt={`QR code linking to the Turf Cricket Manager v${APK_VERSION} APK download`}
            width={176}
            height={176}
            className="rounded-bezel"
          />
          <p className="font-body text-xs text-arena-chalk-dim">
            Scan to download on your phone
          </p>
        </div>
      </div>
    </section>
  );
}
