 "use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function LandingBuilder({ page }: { page: any }) {
  const [sections, setSections] = useState(
    [...page.landing_sections].sort((a, b) => a.sort_order - b.sort_order)
  );

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);

    const newSections = arrayMove(sections, oldIndex, newIndex).map(
      (section, index) => ({
        ...section,
        sort_order: index + 1,
      })
    );

    setSections(newSections);

    await fetch("/api/admin/landing-sections/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sections: newSections.map((s) => ({
          id: s.id,
          sort_order: s.sort_order,
        })),
      }),
    });
  }

  async function createSection(type: string) {
    await fetch("/api/admin/landing-sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        landing_page_id: page.id,
        section_key: `${type}-${Date.now()}`,
        section_type: type,
        title: `New ${type} section`,
        sort_order: sections.length + 1,
      }),
    });

    window.location.reload();
  }

  return (
    <div>
      <h1 className="text-3xl font-black">Landing Section Builder</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        {["story", "benefits", "pricing", "testimonials", "faq"].map((type) => (
          <button
            key={type}
            onClick={() => createSection(type)}
            className="rounded-xl bg-cyan-600 px-4 py-3 font-bold text-white"
          >
            + {type}
          </button>
        ))}
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="mt-6 grid gap-4">
            {sections.map((section) => (
              <SortableSection key={section.id} section={section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableSection({ section }: { section: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function remove() {
    if (!confirm("Hapus section ini?")) return;

    await fetch(`/api/admin/landing-sections/${section.id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-3xl bg-white p-5 shadow"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-xl bg-slate-100 px-4 py-2 font-bold"
        >
          Drag
        </button>

        <div className="flex-1">
          <p className="font-black">{section.title}</p>
          <p className="text-sm text-slate-500">
            {section.section_type} — order {section.sort_order}
          </p>
        </div>

        <a
          href="/admin/landing"
          className="rounded-xl bg-slate-950 px-4 py-2 font-bold text-white"
        >
          Edit
        </a>

        <button onClick={remove} className="font-bold text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}