import { useEffect, useState, useCallback } from 'react';
import React from 'react';
import { Pokemon } from '@nx-with-exp-nextjs/shared-types';
import { SharedComponents } from '@nx-with-exp-nextjs/shared-components';

export function Index({
  q,
  pokemon: initialPokemon,
}: {
  q: string;
  pokemon: Pokemon[];
}) {
  const [search, setSearch] = useState(q);
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${escape(search)}`)
      .then((resp) => resp.json())
      .then((data) => setPokemon(data));
  }, [search]);

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    []
  );

  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
          <SharedComponents />
          <input type="search" value={search} onChange={onSetSearch} />
          <ul>
            {pokemon.map(({ id, name: { english } }) => (
              <li key={id}>{english}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let pokemon = [];
  if (context.query.q) {
    const res = await fetch(
      `http://localhost:3333/search?q=${escape(context.query.q)}`
    );
    pokemon = await res.json();
  }

  return {
    props: {
      q: context.query.q ?? '',
      pokemon,
    },
  };
}

export default Index;
