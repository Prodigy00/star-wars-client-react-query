import React, {useState} from 'react'
import { usePaginatedQuery } from 'react-query'
import Person from './Person';


const fetchPeople = async (key, pageNum) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${pageNum}`);
  return res.json();
}
export default function People() {
  const [pageNum, setPageNum] = useState(1);
  // const {data, status} = useQuery(['people', pageNum], fetchPeople);
  const {resolvedData, latestData, status} = usePaginatedQuery(['people', pageNum], fetchPeople);
  console.log({ resolvedData, latestData, status})
  return (
    <div>
      <h2>People</h2>
      <button onClick={() => setPageNum(1)}>page 1</button>
      <button onClick={() => setPageNum(2)}>page 2</button>
      <button onClick={() => setPageNum(3)}>page 3</button>
      {status === 'loading' && (<div>Loading data...</div>)}
      {status === 'error' && (<div>Error fetching data</div>)}
      {status === 'success' && (
        <>
        <button 
        onClick={() => setPageNum(old => Math.max(old - 1, 1))}
        disabled={pageNum === 1}
        >
          Previous Page
        </button>
        <span>{pageNum}</span>
        <button 
        onClick={() => setPageNum(old => (!latestData || !latestData.next ? old : old + 1))}
        disabled={!latestData || !latestData.next}
        >Next Page</button>
        <div>
        {resolvedData.results.map(people => <Person key={people.name} person={people}/>)}
        </div>
        </>
      )}
    </div>
  )
}
