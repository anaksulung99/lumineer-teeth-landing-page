"use client";

import { useState } from "react";
import type { LandingSection } from "@/types/landing";

export function LandingSectionForm({ section }: { section: LandingSection }) {
  const [form, setForm] = useState(section);
  const [metadataText, setMetadataText] = useState(
    JSON.stringify(section.metadata || {}, null, 2)
  );
  const [loading, setLoading] = useState(false);

  async function save() {
    let metadata: Record<string, unknown>;

    try {
      metadata = JSON.parse(metadataText);
    } catch {
      alert("Metadata JSON belum valid. Cek koma, kurung, atau tanda kutipnya.");
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/admin/landing-sections/${section.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, metadata }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      alert(data?.message || "Gagal menyimpan section");
      return;
    }

    setForm({ ...form, metadata });
    setMetadataText(JSON.stringify(metadata, null, 2));
    alert("Section berhasil disimpan");
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow">
      <p className="mb-4 font-black uppercase text-cyan-600">
        {section.section_type}
      </p>

      <input
        className="w-full rounded-xl border px-4 py-3"
        value={form.title || ""}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
      />

      <input
        className="mt-3 w-full rounded-xl border px-4 py-3"
        value={form.subtitle || ""}
        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        placeholder="Subtitle"
      />

      <textarea
        className="mt-3 min-h-28 w-full rounded-xl border px-4 py-3"
        value={form.body || ""}
        onChange={(e) => setForm({ ...form, body: e.target.value })}
        placeholder="Body"
      />

      <input
        className="mt-3 w-full rounded-xl border px-4 py-3"
        value={form.image_url || ""}
        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        placeholder="Image URL"
      />

      <input
        className="mt-3 w-full rounded-xl border px-4 py-3"
        value={form.button_text || ""}
        onChange={(e) => setForm({ ...form, button_text: e.target.value })}
        placeholder="Button Text"
      />

      <textarea
        className="mt-3 min-h-40 w-full rounded-xl border px-4 py-3 font-mono text-sm"
        value={metadataText}
        onChange={(e) => setMetadataText(e.target.value)}
        placeholder="Metadata JSON"
      />

      <button
        onClick={save}
        disabled={loading}
        className="mt-4 rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white"
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </div>
  );
}
