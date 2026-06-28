import DataHeroStats from "@/components/data/DataHeroStats";
import GeographyExplorer from "@/components/data/GeographyExplorer";
import CropExplorer from "@/components/data/CropExplorer";
import FertilizersTab from "@/components/data/FertilizersTab";
import ChartsSection from "@/components/data/ChartsSection";
import DownloadSection from "@/components/data/DownloadSection";
import { Separator } from "@/components/ui/separator";

export default function DataPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800">Data Explorer</h1>
          <p className="font-(family-name:--font-hind) text-slate-500 mt-1">
            ডেটা এক্সপ্লোরার
          </p>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Explore the complete Bangladesh crop fertilizer dataset - geographic
            coverage, crop varieties, fertilizer reference, and visual insights.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        <DataHeroStats />
        <Separator />

        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Geographic Coverage
            </h2>
            <p className="font-(family-name:--font-hind) text-slate-400 text-sm mt-0.5">
              ভৌগোলিক বিস্তার
            </p>
          </div>
          <GeographyExplorer />
        </section>
        <Separator />

        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Crop & Variety Explorer
            </h2>
            <p className="font-(family-name:--font-hind) text-slate-400 text-sm mt-0.5">
              ফসল ও জাত অন্বেষণ
            </p>
          </div>
          <CropExplorer />
        </section>
        <Separator />

        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Fertilizer & Nutrient Reference
            </h2>
            <p className="font-(family-name:--font-hind) text-slate-400 text-sm mt-0.5">
              সার ও পুষ্টি তথ্য
            </p>
          </div>
          <FertilizersTab />
        </section>
        <Separator />

        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">Data Insights</h2>
            <p className="font-(family-name:--font-hind) text-slate-400 text-sm mt-0.5">
              ডেটা বিশ্লেষণ
            </p>
          </div>
          <ChartsSection />
        </section>
        <Separator />

        <DownloadSection />
      </div>
    </div>
  );
}
