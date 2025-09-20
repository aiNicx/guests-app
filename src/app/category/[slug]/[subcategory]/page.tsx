"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ArrowLeft, Home, Phone, Mail, MapPin, Globe, Clock, Euro } from "lucide-react";

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
  
  // Mappa i slug delle sottocategorie ai nomi esatti nel database
  const subcategoryMapping: Record<string, string> = {
    // Casa
    "regole-della-casa": "Regole della casa",
    "check-in-check-out": "Check-in / Check-out",
    "checkin-checkout": "Check-in / Check-out",
    "check-in_check-out": "Check-in / Check-out",
    "checkin_checkout": "Check-in / Check-out",
    "check in check out": "Check-in / Check-out",
    "check-in/check-out": "Check-in / Check-out",
    "regole-generali": "Regole generali",
    
    // Contatti & Emergenze
    "numeri-utili": "Numeri utili",
    "emergenze": "Emergenze",
    
    // Attivita & Esperienze
    "trasporto-barca-vincenzo": "Trasporto barca (Vincenzo)",
    "boat-tour-alfonso": "Boat tour (Alfonso)",
    "sup-rent-marina-dal-bori": "SUP Rent (Marina dal Bori)",
    "ape-calessino-antonino": "Ape Calessino (Antonino)",
    
    // Food & Drink
    "ristoranti-consigliati": "Ristoranti consigliati",
    "menu": "Menu",
    "tasting-menus": "Tasting Menus",
    
    // Trasporti
    "collegamenti-bus-traghetti": "Collegamenti bus / traghetti",
    "parcheggi": "Parcheggi",
    "noleggi-auto-scooter-bici": "Noleggi auto/scooter/bici"
  };

  // Usa la mappa per ottenere il nome corretto, altrimenti fallback alla conversione automatica
  let subcategoryName = subcategoryMapping[subcategorySlug];
  
  // Se non trovato nella mappa, prova varianti comuni
  if (!subcategoryName) {
    // Prova con underscore invece di trattini
    const underscoreVariant = subcategorySlug.replace(/-/g, '_');
    subcategoryName = subcategoryMapping[underscoreVariant];
  }
  
  // Se ancora non trovato, prova con spazi invece di trattini
  if (!subcategoryName) {
    const spaceVariant = subcategorySlug.replace(/-/g, ' ');
    subcategoryName = subcategoryMapping[spaceVariant];
  }
  
  // Se ancora non trovato, usa la conversione automatica
  if (!subcategoryName) {
    subcategoryName = subcategorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Recupera i dati dal database Convex
  const contentData = useQuery(api.contents.getSubcategoryDetail, {
    category: category?.name || "",
    subcategory: subcategoryName,
  });

  // Debug: mostra i parametri di ricerca
  console.log("Searching for:", {
    category: category?.name,
    subcategory: subcategoryName,
    originalSlug: subcategorySlug,
    mappingFound: subcategoryMapping[subcategorySlug] ? true : false,
    availableMappings: Object.keys(subcategoryMapping)
  });

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

  // Loading state
  if (contentData === undefined) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento contenuto...</p>
          </div>
        </div>
      </main>
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
        {contentData ? (
          <div className="space-y-6">
            {/* Descrizione principale */}
            {(contentData.title || contentData.description || contentData.content) && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                {contentData.title && (
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {contentData.title}
                  </h2>
                )}
                {contentData.description && (
                  <p className="text-gray-600 mb-4 text-lg">
                    {contentData.description}
                  </p>
                )}
                {contentData.content && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">
                      {contentData.content}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Informazioni di contatto */}
            {contentData.contactInfo && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contatti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contentData.contactInfo.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-600" />
                      <a href={`tel:${contentData.contactInfo.phone}`} className="text-blue-600 hover:underline">
                        {contentData.contactInfo.phone}
                      </a>
                    </div>
                  )}
                  {contentData.contactInfo.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      <a href={`mailto:${contentData.contactInfo.email}`} className="text-blue-600 hover:underline">
                        {contentData.contactInfo.email}
                      </a>
                    </div>
                  )}
                  {contentData.contactInfo.address && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-gray-700">{contentData.contactInfo.address}</span>
                    </div>
                  )}
                  {contentData.contactInfo.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-blue-600" />
                      <a href={contentData.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Sito web
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Istruzioni */}
            {contentData.instructions && contentData.instructions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Istruzioni
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  {contentData.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-700">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Consigli */}
            {contentData.tips && contentData.tips.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Consigli utili
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {contentData.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prezzi */}
            {contentData.pricing && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Euro className="w-5 h-5 mr-2" />
                  Prezzi
                </h3>
                <div className="space-y-2">
                  {contentData.pricing.price && (
                    <p className="text-lg font-semibold text-gray-800">
                      {contentData.pricing.price} {contentData.pricing.currency || "€"}
                    </p>
                  )}
                  {contentData.pricing.notes && (
                    <p className="text-gray-600">{contentData.pricing.notes}</p>
                  )}
                </div>
              </div>
            )}

            {/* Orari */}
            {contentData.schedule && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Orari e disponibilità
                </h3>
                <div className="space-y-2">
                  {contentData.schedule.openingHours && (
                    <p className="text-gray-700">
                      <span className="font-medium">Orari:</span> {contentData.schedule.openingHours}
                    </p>
                  )}
                  {contentData.schedule.availability && (
                    <p className="text-gray-700">
                      <span className="font-medium">Disponibilità:</span> {contentData.schedule.availability}
                    </p>
                  )}
                  {contentData.schedule.seasonality && (
                    <p className="text-gray-700">
                      <span className="font-medium">Stagionalità:</span> {contentData.schedule.seasonality}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Posizione */}
            {contentData.location && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Posizione
                </h3>
                <div className="space-y-2">
                  {contentData.location.address && (
                    <p className="text-gray-700">{contentData.location.address}</p>
                  )}
                  {contentData.location.directions && (
                    <p className="text-gray-600 text-sm">{contentData.location.directions}</p>
                  )}
                </div>
              </div>
            )}

            {/* Immagini */}
            {contentData.images && contentData.images.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Immagini
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentData.images.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`${subcategoryName} - Immagine ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        onError={(e) => {
                          // Nasconde l'immagine se non si carica
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <button 
                          onClick={() => window.open(image, '_blank')}
                          className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-opacity-100"
                        >
                          Visualizza
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Link utili */}
            {contentData.links && contentData.links.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Link utili
                </h3>
                <div className="space-y-3">
                  {contentData.links.map((link, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {link.title}
                      </a>
                      {link.description && (
                        <p className="text-gray-600 text-sm mt-1">{link.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Fallback quando non ci sono dati
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
        )}
      </div>
    </main>
  );
}
