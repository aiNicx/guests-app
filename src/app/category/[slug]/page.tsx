"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
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

export default function CategoryDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const category = categoryData[slug as keyof typeof categoryData];
  
  const subcategories = useQuery(api.contents.getSubcategories, {
    category: category?.name || "",
  });

  // Debug: mostra cosa stiamo cercando e cosa troviamo
  console.log("Category search:", category?.name);
  console.log("Subcategories found:", subcategories);

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
          <span className="text-gray-800 font-medium">{category.name}</span>
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
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {category.name}
            </h1>
            <p className="text-gray-600 text-lg">
              {category.description}
            </p>
          </div>
        </div>

        {/* Sottocategorie */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subcategories?.map((sub, index) => (
            <SubcategoryCard 
              key={index} 
              subcategory={sub.subcategory}
              categorySlug={slug}
            />
          )) || (
            <div className="col-span-full text-center py-8">
              <div className="text-gray-500">Caricamento sottocategorie...</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function SubcategoryCard({ 
  subcategory, 
  categorySlug 
}: { 
  subcategory: string;
  categorySlug: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    // Per ora naviga verso una pagina di dettaglio sottocategoria
    // Puoi implementare questa funzionalità in seguito
    const subcategorySlug = subcategory.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    
    router.push(`/category/${categorySlug}/${subcategorySlug}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 cursor-pointer hover:scale-105"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {subcategory}
          </h3>
          <p className="text-sm text-gray-600">
            Clicca per vedere i dettagli
          </p>
        </div>
        <div className="text-blue-600">
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
