import { Modal, DataRow } from "@/components";
import { RootState, wrapper } from "@/store";
import { openModal } from "@/store/features/modalSlice";
import { getPopularMovies, getTopRatedMovies, useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, getRunningOperationPromises as movieGetRunningOperationPromises, useGetMovieVideosQuery, getMovieVideos } from "@/store/services/ApiMovieSlice";
import { Billboard } from "@fcastillo90/netflix-ui";
import { CategoryType, GetVideos } from "@fcastillo90/types";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// Server side Api calls
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
      store.dispatch(getPopularMovies.initiate(null))
      store.dispatch(getTopRatedMovies.initiate(null))
      const videoId = (store.getState().movieApi.queries['getPopularMovies(null)'].data as GetVideos)?.results[0].id
      if (videoId) store.dispatch(getMovieVideos.initiate(+videoId))
  
      await Promise.all(movieGetRunningOperationPromises());

      return {
        props: {},
      };
    }
  );

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)

  const popularMoviesResult = useGetPopularMoviesQuery(null, { skip: router.isFallback, });
  const {data: popularMoviesData } = popularMoviesResult;
  
  const topRatedMoviesResult = useGetTopRatedMoviesQuery(null, { skip: router.isFallback, });
  const {data: topRatedMoviesData } = topRatedMoviesResult;


  const handleMoreInfo = () => {
    dispatch(openModal({
      id,
      category: CategoryType.MOVIE
    }))
  }

  const {
    id,
    backdrop_path,
    overview,
    poster_path,
    title,
  } = popularMoviesData?.results[0] || {}

  const movieVideoResult = useGetMovieVideosQuery(id, { skip: router.isFallback, });
  const {data: movieVideoData } = movieVideoResult;

  return (
    <>
      <Billboard
        category={CategoryType.MOVIE}
        handleMoreInfo={handleMoreInfo}
        id={id}
        image={backdrop_path ?? poster_path}
        isModalOpen={isModalOpen}
        overview={overview}
        title={title}
        videoData={movieVideoData?.results || []}
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