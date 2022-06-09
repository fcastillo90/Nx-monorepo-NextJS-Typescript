import { getPopularSerie, getRunningOperationPromises, useGetPopularSerieQuery } from "@/store/services/ApiSerieSlice";
import { CategoryType } from "@fcastillo90/types";
import { DataRow, Modal } from "@/components";
import { wrapper } from "@/store";
import { useRouter } from "next/router";

// Server side Api calls
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
      store.dispatch(getPopularSerie.initiate(null))
  
      await Promise.all(getRunningOperationPromises());
  
      return {
        props: {},
      };
    }
  );
  
const BrowseTv = () => {
  const router = useRouter();
  const popularSerieResult = useGetPopularSerieQuery(
    null,
    { skip: router.isFallback, }
  );
  const { data: popularData } = popularSerieResult;

  const {
    id,
    backdrop_path,
    overview,
    poster_path,
    name,
  } = popularData?.results[0] || {}


  return (
    <>
      {/* <Billboard 
        category={CategoryType.SERIE}
        id={id}
        title={name}
        image={backdrop_path ?? poster_path}
        overview={overview}
      /> */}
      {popularData && <DataRow
        category={CategoryType.SERIE}
        data={popularData}
        title="Popular on Netflix"
      />}
      <Modal />
    </>
  )
}

export default BrowseTv