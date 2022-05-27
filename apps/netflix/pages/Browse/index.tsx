import { Billboard, Modal, DataRow } from "@/components";
import { wrapper } from "@/store";
import { getPopularMovies, getTopRatedMovies, useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, getRunningOperationPromises as movieGetRunningOperationPromises } from "@/store/services/ApiMovieSlice";
import { CategoryType } from "@fcastillo90/types";
import { useRouter } from "next/router";

// Server side Api calls
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
      store.dispatch(getPopularMovies.initiate(null))
      store.dispatch(getTopRatedMovies.initiate(null))
  
      await Promise.all(movieGetRunningOperationPromises());
  
      return {
        props: {},
      };
    }
  );

const Home = () => {
  const router = useRouter();

  const popularMoviesResult = useGetPopularMoviesQuery(
    null,
    {
      skip: router.isFallback,
    }
  );
  const {  data: popularMoviesData } = popularMoviesResult;
  
  const topRatedMoviesResult = useGetTopRatedMoviesQuery(
    null,
    {
      skip: router.isFallback,
    }
  );
  const {data: topRatedMoviesData } = topRatedMoviesResult;


  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    title = '',
  } = popularMoviesData?.results[0] || {}

  return (
    <>
      <Billboard
        category={CategoryType.MOVIE}
        id={id}
        title={title}
        image={backdrop_path ?? poster_path}
        overview={overview}
      />
     {popularMoviesData && <DataRow
        title="Popular on Netflix"
        category={CategoryType.MOVIE}
        data={popularMoviesData}
      />}
      
      {popularMoviesData && <DataRow
        title="Popular on Netflix"
        category={CategoryType.MOVIE}
        data={popularMoviesData}
        isTopTen={true}
      />}
      {topRatedMoviesData && <DataRow
        title="Lastest Movies"
        category={CategoryType.MOVIE}
        data={topRatedMoviesData}
        isLarge={true}
      />}
      {topRatedMoviesData && <DataRow
        title="Lastest Movies"
        category={CategoryType.MOVIE}
        data={topRatedMoviesData}
        isLarge={true}
        isTopTen={true}
      />} 
      <Modal />
    </>
  )
}

export default Home