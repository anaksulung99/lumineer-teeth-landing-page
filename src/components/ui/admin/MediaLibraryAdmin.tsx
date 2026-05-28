 "use client";

import Image from "next/image";
import { useState } from "react";

export function MediaLibraryAdmin({ media }: { media: any[] }) {
  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/admin/media", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    window.location.reload();
  }

  async function remove(id: string) {
    if (!confirm("Hapus gambar ini?")) return;

    await fetch(`/api/admin/media/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <div>
      <h1 className="text-3xl font-black">Media Library</h1>

      <div className="mt-6 rounded-3xl bg-white p-5 shadow">
        <input
          type="file"
          accept="image/*"
          disabled={loading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-4">
        {media.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white p-3 shadow">
            <Image
              src={item.file_url}
              alt={item.file_name}
              width={400}
              height={400}
              className="aspect-square rounded-2xl object-cover"
            />

            <p className="mt-3 truncate text-sm font-bold">{item.file_name}</p>

            <input
              readOnly
              value={item.file_url}
              className="mt-2 w-full rounded-xl border px-3 py-2 text-xs"
              onFocus={(e) => e.target.select()}
            />

            <button
              onClick={() => remove(item.id)}
              className="mt-3 w-full rounded-xl bg-red-500 px-4 py-2 font-bold text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}