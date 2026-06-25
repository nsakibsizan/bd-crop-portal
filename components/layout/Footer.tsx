import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
              <Leaf className="w-4 h-4 text-green-400" />
              BD Crop Fertilizer Portal
            </div>
            <p className="text-sm leading-relaxed">
              A research initiative combining Machine Learning, Blockchain, and
              Post-Quantum Cryptography for smart fertilizer recommendation in Bangladesh.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Institution</h4>
            <p className="text-sm">Jagannath University</p>
            <p className="text-sm">Department of Computer Science and Engineering</p>
            <p className="text-sm">Dhaka, Bangladesh</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Data Source</h4>
            <p className="text-sm">Bangladesh Crop Zoning Information System</p>
            <p className="text-sm text-green-400 mt-1">czis.cropzoning.gov.bd</p>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-xs">
          © {new Date().getFullYear()} BD Crop Fertilizer Research Portal. Jagannath University.
        </div>
      </div>
    </footer>
  );
}