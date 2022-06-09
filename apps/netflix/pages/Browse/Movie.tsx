import { getPopularMovies, getRunningOperationPromises, useGetMovieVideosQuery, useGetPopularMoviesQuery } from "@/store/services/ApiMovieSlice";
import { CategoryType } from "@fcastillo90/types";
import { RootState, wrapper } from "@/store";
import { DataRow, Modal } from "@/components";
import { useRouter } from "next/router";
import { openModal } from "@/store/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { Billboard } from "@fcastillo90/netflix-ui";

// Server side Api calls
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
      store.dispatch(getPopularMovies.initiate(null))
  
      await Promise.all(getRunningOperationPromises());
  
      return {
        props: {},
      };
    }
  );

const BrowseMovie = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)
  const popularMoviesResult = useGetPopularMoviesQuery(
    null,
    { skip: router.isFallback, }
  );
  const { data: popularMoviesData } = popularMoviesResult;

  const handleMoreInfo = () => {
    dispatch(openModal({
      id,
      category: CategoryType.MOVIE
    }))
  }

  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    title = '',
  } = popularMoviesData?.results[0] || { }
  
  const getData = useMemo(() => {
    const {data} = useGetMovieVideosQuery(id)
    return data
  }, [id])
  
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
      videoData={getData.results}
    />
      {popularMoviesData && <DataRow
        category={CategoryType.MOVIE}
        data={popularMoviesData}
        title="Popular on Netflix"
      />}
      <Modal />
    </>
  )
}

export default BrowseMovie