import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRecommendationsChange = (nextRecommendations) => {
    setRecommendations(nextRecommendations);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6 py-8 text-white shadow-2xl shadow-slate-900/15 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
            <div className="space-y-5">
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                  Recomendador de Produtos RD Station
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
                  Selecione as preferencias do negocio, destaque as
                  funcionalidades mais importantes e escolha se quer uma
                  recomendacao enxuta ou uma lista priorizada. A experiencia foi
                  desenhada para ficar clara, previsivel e facil de evoluir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
            <Form onRecommendationsChange={handleRecommendationsChange} />
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
            <RecommendationList
              hasSearched={hasSearched}
              recommendations={recommendations}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
