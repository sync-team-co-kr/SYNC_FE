import { useEffect, useState } from 'react';

import { ITask } from '@customTypes/task';
import { useSearchQueryState } from '@libs/store/searchQuery/searchQuery';

type useFilterSearchQueryType = (tasks?: ITask[]) => ITask[] | undefined;

const useFilterSearchQuery: useFilterSearchQueryType = (tasks) => {
  const { searchQuery } = useSearchQueryState();
  const [searchQueryResult, setSearchQueryResult] = useState(tasks);

  useEffect(() => {
    if (tasks) {
      const tasksQuery = tasks.filter((task) => task.title.match(searchQuery));
      setSearchQueryResult(tasksQuery);
    }
  }, [searchQuery]);

  return searchQueryResult;
};

export default useFilterSearchQuery;
