import { styled } from "@mui/material";

const Container = styled('div')`
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  flex-flow: row;
  padding-right: 20px;
  padding-left: 56px;
  align-items: center;
  align-content: stretch;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`
export default Container