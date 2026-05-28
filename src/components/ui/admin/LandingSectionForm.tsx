 "use client";

import { useState } from "react";

export function LandingSectionForm({ section }: { section: any }) {
  const [form, setForm] = useState(section);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);

    await fetch(`/api/admin/landing-sections/${section.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
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
        value={JSON.stringify(form.metadata || {}, null, 2)}
        onChange={(e) => {
          try {
            setForm({ ...form, metadata: JSON.parse(e.target.value) });
          } catch {}
        }}
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