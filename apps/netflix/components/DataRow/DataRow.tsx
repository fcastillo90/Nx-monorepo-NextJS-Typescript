import {  styled, Typography } from "@mui/material"
import { CategoryType, MovieList, SerieList } from "@fcastillo90/types";
import { getSlug, Slider } from "@fcastillo90/netflix-ui";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/store/features/modalSlice";
import { RootState } from "@/store";

interface DataRowProps {
  category: CategoryType;
  data: MovieList | SerieList;
  title: string;
  isLarge?: boolean;
  isTopTen?: boolean;
}

const StyledTypography = styled(Typography)`
  font-weight: bold;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  margin-bottom: -95px;
  font-size: 1.3rem;
`

const DataRow = (props: DataRowProps) => {
  const {category, data, title, isLarge, isTopTen} = props
  const dispatch = useDispatch()
  const genreList: any = useSelector((state: RootState) => state[category]?.queries['getMovieGenreList(null)']?.data);

  const handleOpenModal = (id: number) => dispatch(openModal({ id, category }))

  const getHeight = () => {
    if (isLarge) return 456
    if (isTopTen) return 256
    return 216
  }
  return (
    <div style={{ height: getHeight() }}>
      <StyledTypography>
        {title}
      </StyledTypography>
      <Slider 
        data={data.results}
        genreList={genreList}
        slug={getSlug(title)}
        isLarge={isLarge}
        isTopTen={isTopTen}
        handleDetailModal={handleOpenModal}
      />
    </div>
  )
}

export default memo(DataRow)