"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

const categoryData = {
  "casa": {
    name: "Casa",
    icon: "🏠",
    description: "Regole e informazioni sulla casa"
  },
  "contatti-emergenze": {
    name: "Contatti & Emergenze",
    icon: "📞",
    description: "Numeri utili e contatti di emergenza"
  },
  "attivita-esperienze": {
    name: "Attivita & Esperienze",
    icon: "🚤",
    description: "Tour, escursioni e attività locali"
  },
  "food-drink": {
    name: "Food & Drink",
    icon: "🍽️",
    description: "Ristoranti e menu consigliati"
  },
  "trasporti": {
    name: "Trasporti",
    icon: "🚌",
    description: "Collegamenti e noleggi"
  }
};

export default function SubcategoryDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const subcategorySlug = params.subcategory as string;
  
  const category = categoryData[slug as keyof typeof categoryData];
  
  // Converte il slug della sottocategoria in un nome leggibile
  const subcategoryName = subcategorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Categoria non trovata
            </h1>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Torna alla home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center hover:text-blue-600 transition-colors"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => router.push(`/category/${slug}`)}
            className="hover:text-blue-600 transition-colors"
          >
            {category.name}
          </button>
          <span>/</span>
          <span className="text-gray-800 font-medium">{subcategoryName}</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Indietro
          </button>
          
          <div className="text-center">
            <div className="text-4xl mb-4">{category.icon}</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {subcategoryName}
            </h1>
            <p className="text-gray-600 text-lg">
              Dettagli per {subcategoryName.toLowerCase()} in {category.name}
            </p>
          </div>
        </div>

        {/* Contenuto */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contenuto in arrivo
            </h2>
            <p className="text-gray-600 mb-8">
              I dettagli per {subcategoryName} saranno disponibili a breve.
            </p>
            
            <div className="space-y-4 max-w-md mx-auto">
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Cosa troverai qui:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Informazioni dettagliate</li>
                  <li>• Contatti utili</li>
                  <li>• Istruzioni passo-passo</li>
                  <li>• Consigli e suggerimenti</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
