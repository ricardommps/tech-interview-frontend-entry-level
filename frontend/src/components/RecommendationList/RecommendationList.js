import PropTypes from 'prop-types';
import React from 'react';

function MatchSection({ items, title, tone }) {
  if (items.length === 0) {
    return null;
  }

  const toneClasses =
    tone === 'feature'
      ? 'bg-emerald-50 text-emerald-700'
      : 'bg-cyan-50 text-cyan-700';

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function RecommendationList({ hasSearched = false, recommendations }) {
  const hasRecommendations = recommendations.length > 0;

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Resultado recomendado
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              Veja os produtos ordenados pelo nivel de aderencia ao contexto
              informado.
            </p>
          </div>

          <span className="inline-flex w-fit shrink-0 self-start whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
            {recommendations.length} produto(s)
          </span>
        </div>
      </div>

      {!hasRecommendations ? (
        <div className="flex min-h-[320px] flex-1 items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
          <div className="max-w-sm space-y-3">
            <p className="text-lg font-semibold text-slate-900">
              {hasSearched
                ? 'Nenhum produto aderente foi encontrado.'
                : 'Sua recomendacao aparece aqui.'}
            </p>
            <p className="text-sm leading-6 text-slate-500">
              {hasSearched
                ? 'Revise as selecoes do formulario para ampliar os criterios ou testar outro formato de resposta.'
                : 'Selecione pelo menos uma preferencia ou funcionalidade, escolha o formato e gere a recomendacao.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {recommendations.map((recommendation) => (
            <article
              key={recommendation.id}
              className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-200/70"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {recommendation.category}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {recommendation.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {recommendation.score} criterio(s) em comum
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-200/70">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Score
                  </p>
                  <p className="mt-2 text-3xl font-black text-slate-900">
                    {recommendation.score}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                <MatchSection
                  items={recommendation.matchedPreferences}
                  title="Preferencias atendidas"
                  tone="preference"
                />
                <MatchSection
                  items={recommendation.matchedFeatures}
                  title="Funcionalidades atendidas"
                  tone="feature"
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

MatchSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  tone: PropTypes.oneOf(['feature', 'preference']).isRequired,
};

RecommendationList.propTypes = {
  hasSearched: PropTypes.bool,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      matchedFeatures: PropTypes.arrayOf(PropTypes.string).isRequired,
      matchedPreferences: PropTypes.arrayOf(PropTypes.string).isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default RecommendationList;
