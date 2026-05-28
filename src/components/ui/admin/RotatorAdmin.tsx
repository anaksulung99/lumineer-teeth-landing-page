 "use client";

import { useState } from "react";

export function RotatorAdmin({ groups }: { groups: any[] }) {
  const [name, setName] = useState("");

  async function createGroup() {
    await fetch("/api/admin/rotator/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, strategy: "round_robin" }),
    });

    window.location.reload();
  }

  return (
    <div className="mt-6">
      <div className="rounded-3xl bg-white p-5 shadow">
        <h2 className="text-xl font-black">Tambah Group CS</h2>

        <div className="mt-4 flex gap-3">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Nama group"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={createGroup}
            className="rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white"
          >
            Tambah
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

function GroupCard({ group }: { group: any }) {
  const [agentName, setAgentName] = useState("");
  const [phone, setPhone] = useState("");

  async function updateStrategy(strategy: string) {
    await fetch(`/api/admin/rotator/groups/${group.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ strategy }),
    });

    window.location.reload();
  }

  async function deleteGroup() {
    if (!confirm("Hapus group ini?")) return;

    await fetch(`/api/admin/rotator/groups/${group.id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  async function addAgent() {
    await fetch(`/api/admin/rotator/agents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_id: group.id, name: agentName, phone }),
    });

    window.location.reload();
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black">{group.name}</h2>
          <p className="text-sm text-slate-500">Strategy: {group.strategy}</p>
        </div>

        <button onClick={deleteGroup} className="text-sm font-bold text-red-500">
          Delete
        </button>
      </div>

      <select
        className="mt-4 rounded-xl border px-4 py-3"
        defaultValue={group.strategy}
        onChange={(e) => updateStrategy(e.target.value)}
      >
        <option value="round_robin">Round Robin</option>
        <option value="equal">Sama Rata</option>
        <option value="percentage">Percentage</option>
      </select>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <h3 className="font-black">Tambah Agent</h3>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Nama CS"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />

          <input
            className="rounded-xl border px-4 py-3"
            placeholder="628xxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={addAgent}
            className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white"
          >
            Tambah Agent
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {group.wa_agents?.map((agent: any) => (
          <AgentRow key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

function AgentRow({ agent }: { agent: any }) {
  const [form, setForm] = useState(agent);

  async function save() {
    await fetch(`/api/admin/rotator/agents/${agent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.reload();
  }

  async function remove() {
    if (!confirm("Hapus agent ini?")) return;

    await fetch(`/api/admin/rotator/agents/${agent.id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <div className="grid gap-3 rounded-2xl border p-4 md:grid-cols-6">
      <input
        className="rounded-xl border px-3 py-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="rounded-xl border px-3 py-2"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        className="rounded-xl border px-3 py-2"
        type="number"
        value={form.percentage}
        onChange={(e) =>
          setForm({ ...form, percentage: Number(e.target.value) })
        }
      />

      <input
        className="rounded-xl border px-3 py-2"
        type="number"
        value={form.sort_order}
        onChange={(e) =>
          setForm({ ...form, sort_order: Number(e.target.value) })
        }
      />

      <button onClick={save} className="rounded-xl bg-cyan-600 font-bold text-white">
        Save
      </button>

      <button onClick={remove} className="rounded-xl bg-red-500 font-bold text-white">
        Delete
      </button>
    </div>
  );
}