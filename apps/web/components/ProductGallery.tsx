"use client";

import { useMemo, useState } from "react";
import { CatalogCard } from "@/components/CatalogCard";
import { FilterChip } from "@/components/FilterChip";
import { Modal } from "@/components/Modal";
import { GatedAccessForm } from "@/components/GatedAccessForm";
import { CATALOG, OWNING_CELLS, NIST_FUNCTIONS, type CatalogEntry, type NistFunction, type OwningCell } from "@/lib/data/catalog";
import { NIST_FUNCTION_COLORS } from "@/lib/nist-colors";

export function ProductGallery() {
  const [cellFilter, setCellFilter] = useState<OwningCell | null>(null);
  const [nistFilter, setNistFilter] = useState<NistFunction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return CATALOG.filter((e) => {
      if (cellFilter && e.owningCell !== cellFilter) return false;
      if (nistFilter && e.nistFunction !== nistFilter) return false;
      return true;
    });
  }, [cellFilter, nistFilter]);

  return (
    <>
      <div className="space-y-4">
        <p className="telemetry">Filter by owning cell</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All cells"
            active={cellFilter === null}
            onClick={() => setCellFilter(null)}
          />
          {OWNING_CELLS.map((c) => (
            <FilterChip
              key={c}
              label={c.replace(/_/g, " ")}
              active={cellFilter === c}
              onClick={() => setCellFilter(cellFilter === c ? null : c)}
            />
          ))}
        </div>
        <p className="telemetry mt-6">Filter by NIST function</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All functions"
            active={nistFilter === null}
            onClick={() => setNistFilter(null)}
          />
          {NIST_FUNCTIONS.map((n) => (
            <FilterChip
              key={n}
              label={n}
              active={nistFilter === n}
              onClick={() => setNistFilter(nistFilter === n ? null : n)}
              color={NIST_FUNCTION_COLORS[n]}
            />
          ))}
        </div>
      </div>
      <p className="mt-8 text-sm text-text-muted">
        Showing {filtered.length} of {CATALOG.length} catalog entries
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((entry: CatalogEntry) => (
          <CatalogCard
            key={entry.catalogId}
            entry={entry}
            onRequestPreview={() => setModalOpen(true)}
          />
        ))}
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request live preview"
      >
        <GatedAccessForm onSuccess={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}
