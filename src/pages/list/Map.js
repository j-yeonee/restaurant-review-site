import styled from "styled-components";

import { useEffect, useState } from "react";

export const MapContainer = styled.div`
  width: 65%;
  height: 100vh;
  background-color: white;
  border-radius: 7px;
`;

const Map = ({ detailData }) => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  const mapxString = "1269861240";
  const mapyString = "375740750";

  // 문자열에서 숫자를 추출하여 소수점을 추가하고 실수로 변환하는 함수
  const convertToFloat = (value, beforeDot, afterDot) => {
    const intValue = parseInt(value, 10);
    const beforeDecimal = intValue.toString().slice(0, beforeDot);
    const afterDecimal = intValue.toString().slice(beforeDot);
    const result = `${beforeDecimal}.${afterDecimal}`;

    return parseFloat(result);
  };

  // 위도와 경도에 소수점 추가 및 실수로 변환
  const mapy = convertToFloat(mapyString, 2, 7); // 예시에서는 2자리 정수, 소수점, 6자리 정수를 추출
  const mapx = convertToFloat(mapxString, 3, 7); // 예시에서는 3자리 정수, 소수점, 6자리 정수를 추출

  // 1) 카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(mapy, mapx),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      setMap(map);
      // setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  // 2) 마커 표시

  return (
    <>
      <MapContainer id="map" />
    </>
  );
};

export default Map;
