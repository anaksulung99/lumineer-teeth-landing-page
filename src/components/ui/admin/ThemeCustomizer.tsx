 "use client";

import { useState } from "react";

export function ThemeCustomizer({ page }: { page: any }) {
  const [form, setForm] = useState({
    brand_name: page.brand_name || "",
    logo_url: page.logo_url || "",
    theme: page.theme || {},
  });

  async function save() {
    await fetch(`/api/admin/landing-pages/${page.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Theme berhasil disimpan");
  }

  const theme = form.theme;

  return (
    <div>
      <h1 className="text-3xl font-black">Theme Customizer</h1>

      <div className="mt-6 grid gap-5 rounded-3xl bg-white p-6 shadow">
        <input
          className="rounded-xl border px-4 py-3"
          placeholder="Brand Name"
          value={form.brand_name}
          onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
        />

        <input
          className="rounded-xl border px-4 py-3"
          placeholder="Logo URL"
          value={form.logo_url}
          onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
        />

        <label className="font-bold">Primary Color</label>
        <input
          type="color"
          value={theme.primary_color || "#0891b2"}
          onChange={(e) =>
            setForm({
              ...form,
              theme: { ...theme, primary_color: e.target.value },
            })
          }
        />

        <label className="font-bold">Secondary Color</label>
        <input
          type="color"
          value={theme.secondary_color || "#0f172a"}
          onChange={(e) =>
            setForm({
              ...form,
              theme: { ...theme, secondary_color: e.target.value },
            })
          }
        />

        <label className="font-bold">Background Color</label>
        <input
          type="color"
          value={theme.background_color || "#ffffff"}
          onChange={(e) =>
            setForm({
              ...form,
              theme: { ...theme, background_color: e.target.value },
            })
          }
        />

        <select
          className="rounded-xl border px-4 py-3"
          value={theme.font_family || "Inter"}
          onChange={(e) =>
            setForm({
              ...form,
              theme: { ...theme, font_family: e.target.value },
            })
          }
        >
          <option value="Inter">Inter</option>
          <option value="Poppins">Poppins</option>
          <option value="Arial">Arial</option>
        </select>

        <input
          className="rounded-xl border px-4 py-3"
          placeholder="CTA Text"
          value={theme.cta_text || ""}
          onChange={(e) =>
            setForm({
              ...form,
              theme: { ...theme, cta_text: e.target.value },
            })
          }
        />

        <input
          className="rounded-xl border px-4 py-3"
          placeholder="CTA Subtext"
          value={theme.cta_subtext || ""}
          onChange={(e) =>
            setForm({
              ...form,
              theme: { ...theme, cta_subtext: e.target.value },
            })
          }
        />

        <button
          onClick={save}
          className="rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white"
        >
          Simpan Theme
        </button>
      </div>
    </div>
  );
}