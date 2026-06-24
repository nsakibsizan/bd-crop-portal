import PredictionForm from "@/components/prediction/PredictionForm";

export default function PredictionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800">Fertilizer Recommendation</h1>
          <p className="font-[family-name:var(--font-hind)] text-slate-500 mt-1">সার সুপারিশ</p>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Select your location, crop, and season to get data-driven fertilizer recommendations
            secured by Blockchain and Post-Quantum Cryptography.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PredictionForm />
      </div>
    </div>
  );
}