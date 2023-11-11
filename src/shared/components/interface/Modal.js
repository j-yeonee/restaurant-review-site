import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import styled from "styled-components";

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
  // const address = props.address;

  // const SIDO = address.map((data) => data.properties.full_nm);
  // console.log(SIDO);

  const content = (
    <LocationBox>
      <h3>지역 설정</h3>
      <LocationMain>
        <DistrictList>
          <h4>광역시도</h4>
          <DistrictItem>
            {/* {SIDO.map((data, index) => (
              <li key={index}>{data}</li>
            ))} */}
          </DistrictItem>
        </DistrictList>
        <DistrictList>
          <h4>시군구</h4>
          <DistrictItem>
            <li></li>
          </DistrictItem>
        </DistrictList>
        <DistrictList>
          <h4>읍면동</h4>
          <DistrictItem>
            <li></li>
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

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-overlay")
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
