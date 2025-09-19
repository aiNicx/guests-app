"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Casa",
    icon: "🏠",
    description: "Regole e informazioni sulla casa"
  },
  {
    name: "Contatti & Emergenze",
    icon: "📞",
    description: "Numeri utili e contatti di emergenza"
  },
  {
    name: "Attivita & Esperienze",
    icon: "🚤",
    description: "Tour, escursioni e attività locali"
  },
  {
    name: "Food & Drink",
    icon: "🍽️",
    description: "Ristoranti e menu consigliati"
  },
  {
    name: "Trasporti",
    icon: "🚌",
    description: "Collegamenti e noleggi"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Case Vacanza Info
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Tutte le informazioni per il tuo soggiorno
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}

function CategoryCard({ category }: { category: typeof categories[0] }) {
  const router = useRouter();
  const subcategories = useQuery(api.contents.getSubcategories, {
    category: category.name,
  });

  const getCategorySlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  };

  const handleCardClick = () => {
    const slug = getCategorySlug(category.name);
    router.push(`/category/${slug}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 cursor-pointer hover:scale-105"
    >
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{category.icon}</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {category.name}
        </h2>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>

      <div className="space-y-2">
        {subcategories?.map((sub, index) => (
          <div
            key={index}
            className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            • {sub.subcategory}
          </div>
        )) || (
          <div className="text-sm text-gray-500 italic">
            Caricamento...
          </div>
        )}
      </div>
    </div>
  );
}
