import React from 'react';

import { Head } from '../../../components/helper/Head';
import { Loading } from '../../../components/helper/Loading';
import { Error } from '../../../components/helper/Error';

import { useFecth } from '../../../hooks/useFecth';

import { STATS_GET } from '../../../api';

const UseStatsGraphs = React.lazy(() =>
  import('../../../components/use_stats_graphs/UseStatsGraphs')
);

export const UserStats = () => {
  const { resquest, data, error } = useFecth();

  React.useEffect(() => {
    const getData = async () => {
      const { url, options } = STATS_GET();
      await resquest(url, options);
    };
    getData();
  }, [resquest]);

  if (error) return <Error error={error} />;
  if (!data) return null;

  return (
    <React.Suspense fallback={<Loading />}>
      <Head title="Estatisticas" />
      <UseStatsGraphs data={data} />
    </React.Suspense>
  );
};
