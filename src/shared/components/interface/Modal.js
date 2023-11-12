import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import styled from "styled-components";
import { useEffect, useState } from "react";
import CategoryItem from "../../../pages/main/components/item/CategoryItem";

const LocationBox = styled.div`
  width: 600px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.3em;
  background-color: #fff;
  border-radius: 7px;
  z-index: 100;
  overflow-y: auto;
`;

const LocationMain = styled.div`
  display: flex;
  border: 1px solid gray;
`;

const DistrictList = styled.div``;

const DistrictItem = styled.ul``;

const ModalOverlay = (props) => {
  const [adrSID, setAdrSID] = useState([]);
  const [adrSIG, setAdrSIG] = useState([]);
  const [adrEMD, setAdrEMD] = useState([]);

  const address = props.address;

  useEffect(() => {
    const full_adr = address.map((data) => data.properties.full_nm.split(" "));
    setAdrSID(full_adr.map((item) => item[0]));
  }, []);

  const removeDuplicates = (arr) => {
    return Array.from(new Set(arr));
  };

  const SID_DATA = removeDuplicates(adrSID);

  const selectedDistricts = (selectedADSIDO, index) => {
    const districts = address
      .filter((data) => data.properties.full_nm.match(selectedADSIDO))
      .map((data) => data.properties.full_nm.split(" ")[index]);

    return removeDuplicates(districts);
  };

  // -------------------------------------
  const handleADSIDOClick = (selectedADSIDO, index) => {
    const districts = selectedDistricts(selectedADSIDO, index);

    console.log("광역시 클릭&시군구 :", districts);

    setAdrSIG(districts);
    setAdrEMD([]);
  };

  // -------------------------------------

  const handleADSIGGClick = (selectedADSIG, index) => {
    const districts = selectedDistricts(selectedADSIG, index);

    console.log("시군구 클릭&읍면동 :", districts);

    setAdrEMD(districts);
  };

  const content = (
    <LocationBox>
      <h3>지역 설정</h3>
      <LocationMain>
        <DistrictList>
          <h4>광역시도</h4>
          <DistrictItem>
            {SID_DATA.map((data) => (
              <li key={data} onClick={() => handleADSIDOClick(data, 1)}>
                {data}
              </li>
            ))}
          </DistrictItem>
        </DistrictList>
        <DistrictList>
          <h4>시군구</h4>
          <DistrictItem>
            {adrSIG.map((data) => (
              <li key={data} onClick={() => handleADSIGGClick(data, 2)}>
                {data}
              </li>
            ))}
          </DistrictItem>
        </DistrictList>
        <DistrictList>
          <h4>읍면동</h4>
          <DistrictItem>
            {adrEMD.map((data) => (
              <li key={data}>{data}</li>
            ))}
          </DistrictItem>
        </DistrictList>
      </LocationMain>
      <div>
        <div>선택한 지역</div>
      </div>
      <div>
        <button onClick={props.onCancel} className="close-button">
          취소
        </button>
        <button>완료</button>
      </div>
    </LocationBox>
  );

  return (
    <>
      {/* <CategoryItem adrSIG={adrSIG} adrEMD={adrEMD} /> */}
      {ReactDOM.createPortal(content, document.getElementById("modal-overlay"))}
    </>
  );
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </>
  );
};

export default Modal;
