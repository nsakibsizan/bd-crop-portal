import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Sprout, FlaskConical, BarChart2 } from "lucide-react";
import GeographyTab from "@/components/data/GeographyTab";
import CropsTab from "@/components/data/CropsTab";
import FertilizersTab from "@/components/data/FertilizersTab";
import ChartsSection from "@/components/data/ChartsSection";

export default function DataPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800">Data Explorer</h1>
          <p className="font-[family-name:var(--font-hind)] text-slate-500 mt-1">ডেটা এক্সপ্লোরার</p>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Browse the complete reference dataset — geographic coverage, crop varieties, and fertilizer
            information sourced from the Bangladesh Crop Zoning Information System.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="charts">
          <TabsList className="mb-6">
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> Charts
            </TabsTrigger>
            <TabsTrigger value="geography" className="flex items-center gap-2">
              <Database className="w-4 h-4" /> Geographic Coverage
            </TabsTrigger>
            <TabsTrigger value="crops" className="flex items-center gap-2">
              <Sprout className="w-4 h-4" /> Crops & Varieties
            </TabsTrigger>
            <TabsTrigger value="fertilizers" className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" /> Fertilizer Reference
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charts"><ChartsSection /></TabsContent>
          <TabsContent value="geography"><GeographyTab /></TabsContent>
          <TabsContent value="crops"><CropsTab /></TabsContent>
          <TabsContent value="fertilizers"><FertilizersTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}