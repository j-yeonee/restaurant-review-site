import styled, { css } from "styled-components";
import CategoryItem from "./item/CategoryItem";
import Modal from "../../../shared/components/interface/Modal";
import { useState } from "react";

export const Section = styled.div`
  width: 60%;
  background-color: white;
  border-radius: 7px;
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5em;
  border-bottom: 1px solid #eeeeee;
`;

export const StyleButton = styled.div`
  font-weight: 500;
  padding: 0.8em 1.5em;
  margin-right: 1em;
  height: auto;
  border: 0;
  border-radius: 2em;
  background-color: #46aa46;
  color: white;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #326d34;
  }

  ${(props) =>
    props.$inverted &&
    css`
      background-color: #faac58;
      &:hover {
        background-color: #ed8b2e;
      }
    `}
`;

const ThemeView = () => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);

  const closeModalHandler = () => setShowModal(false);

  return (
    <>
      {showModal && <Modal onClick={closeModalHandler} />}
      <Section>
        <Location>
          <StyleButton onClick={openModalHandler}>지역 설정</StyleButton>
          <StyleButton $inverted>현재 위치</StyleButton>
        </Location>
        <CategoryItem />
      </Section>
    </>
  );
};

export default ThemeView;
