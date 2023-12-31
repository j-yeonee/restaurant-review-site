/* eslint-disable no-const-assign */
import styled, { css } from "styled-components";
import React, { useState, useEffect } from "react";
import CategoryInfo from "./CategoryInfo";
import Modal from "../../../../shared/components/interface/Modal";
import axios from "axios";

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

const CategoryContainer = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);

  const closeModalHandler = () => setShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      const address_key = process.env.REACT_APP_ADDRESS_API_KEY;
      const base_url = `/req/data?key=${address_key}&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADEMD_INFO`;

      let allData = [];

      for (let i = 1; i <= 6; i++) {
        const url = `${base_url}&page=${i}`;

        try {
          setLoading(true); // 로딩 상태
          const response = await axios.get("/api" + url);
          const data = response.data.response.result.featureCollection.features;
          allData = [...allData, ...data];

          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }

      setAddress(allData);
    };

    fetchData();
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          loading={loading}
          address={address}
          show={showModal}
          onCancel={closeModalHandler}
        />
      )}
      <Section>
        <Location>
          <StyleButton onClick={openModalHandler}>지역 설정</StyleButton>
          <StyleButton $inverted>현재 위치</StyleButton>
        </Location>
        <CategoryInfo />
      </Section>
    </>
  );
};

export default CategoryContainer;
