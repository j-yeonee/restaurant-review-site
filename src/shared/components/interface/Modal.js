import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { LocationContext } from "../../context/LocationContext";

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

  const { state, actions } = useContext(LocationContext);
  const { sid, sig, emd } = state;
  const { setSid, setSig, setEmd, setAdr } = actions;

  const { loading, address, onCancel } = props;

  useEffect(() => {
    // address가 배열인지 확인 후 map을 호출.
    if (address) {
      const full_adr = address.map((data) =>
        data.properties.full_nm.split(" ")
      );
      setAdrSID(full_adr.map((item) => item[0]));
    }
  }, [address]);

  // 중복값 제거, 새로운 배열 반환
  const removeDuplicates = (arr) => {
    return Array.from(new Set(arr));
  };

  const SID_DATA = removeDuplicates(adrSID);

  // 조건부 렌더링 함수
  const selectedDistricts = (selectedDistrict, index) => {
    const districts = address
      .filter((data) => data.properties.full_nm.match(selectedDistrict))
      .map((data) => data.properties.full_nm.split(" ")[index]);

    return removeDuplicates(districts);
  };

  // 광역시(시군구) 클릭 후에 조건부 렌더링 변수 넘기기
  const handleDistrictClick = (
    selectedDistrict,
    index,
    setDistrict,
    resetDistrict
  ) => {
    const districts = selectedDistricts(selectedDistrict, index);

    setDistrict(districts);
    resetDistrict && resetDistrict([]);
  };

  // 클릭한 주소 텍스트 담기
  const handleAdrClick = (e, setAdrSelect, setAdrSig, setAdrEmd) => {
    setAdrSelect(e.target.textContent);
    setAdrSig && setAdrSig("");
    setAdrEmd && setAdrEmd("");
  };

  const content = (
    <LocationBox>
      <h3>지역 설정</h3>
      <LocationMain>
        <DistrictList>
          <h4>광역시도</h4>
          <DistrictItem>
            {SID_DATA.map((data) => (
              <li
                key={data}
                onClick={(e) => {
                  handleDistrictClick(data, 1, setAdrSIG, setAdrEMD);
                  handleAdrClick(e, setSid, setSig, setEmd);
                }}
              >
                {data}
              </li>
            ))}
          </DistrictItem>
        </DistrictList>
        <DistrictList>
          <h4>시군구</h4>
          <DistrictItem>
            {adrSIG.map((data) => (
              <li
                key={data}
                onClick={(e) => {
                  handleDistrictClick(data, 2, setAdrEMD);
                  handleAdrClick(e, setSig);
                }}
              >
                {data}
              </li>
            ))}
          </DistrictItem>
        </DistrictList>
        <DistrictList>
          <h4>읍면동</h4>
          <DistrictItem>
            {adrEMD.map((data) => (
              <li
                key={data}
                onClick={(e) => {
                  handleAdrClick(e, setEmd);
                }}
              >
                {data}
              </li>
            ))}
          </DistrictItem>
        </DistrictList>
      </LocationMain>
      <div>{loading && <p>주소지를 가져오는 중 입니다!</p>}</div>
      <div>
        <div>
          선택한 주소 : {sid} {sig} {emd}
        </div>
      </div>
      <div>
        <button onClick={onCancel}>취소</button>
        <button
          onClick={() => {
            onCancel();
            setAdr([sid, sig, emd]);
          }}
        >
          완료
        </button>
      </div>
    </LocationBox>
  );

  return (
    <>
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
