import { useState, useEffect } from "react";

const useMap = (geoData, level) => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [positions, setPosition] = useState();

  // 1) 위도, 경도 값 배열에 담기
  useEffect(() => {
    const positionsArray = [];

    window.kakao.maps.load(() => {
      const items = geoData.items ? geoData.items : [geoData];

      items &&
        items.map((item) => {
          const { title, mapx, mapy } = item;

          // 문자열에서 숫자를 추출하여 소수점을 추가하고 실수로 변환하는 함수
          const convertToFloat = (value, beforeDot) => {
            const intValue = parseInt(value);
            const beforeDecimal = intValue.toString().slice(0, beforeDot);
            const afterDecimal = intValue.toString().slice(beforeDot);
            const result = `${beforeDecimal}.${afterDecimal}`;

            return parseFloat(result);
          };

          // // 위도와 경도에 소수점 추가 및 실수로 변환
          const MapY = convertToFloat(mapy, 2, 6); // 예시에서는 2자리 정수, 소수점, 7자리 정수를 추출
          const MapX = convertToFloat(mapx, 3, 6); // 예시에서는 3자리 정수, 소수점, 7자리 정수를 추출

          const position = {
            title: title,
            latlng: new window.kakao.maps.LatLng(MapY, MapX),
          };

          positionsArray.push(position);
        });
    });

    setPosition(positionsArray);
  }, [geoData]);
  console.log(positions);

  // 2) 카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      const center =
        positions && positions.length === 1
          ? positions[0].latlng
          : new window.kakao.maps.LatLng(37.27538, 127.05488); // 기본값

      const container = document.getElementById("map");
      const options = {
        center: center,
        level: level,
      };

      const map = new window.kakao.maps.Map(container, options);

      setMap(map);
    });
  }, [geoData, positions, level]);

  // 3) 마커 표시
  useEffect(() => {
    const markers =
      positions &&
      positions.map((data) => {
        const imageSize = new window.kakao.maps.Size(24, 35);

        const markerImage = new window.kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          imageSize
        );

        return new window.kakao.maps.Marker({
          map: map,
          position: data.latlng,
          title: data.title,
          image: markerImage,
        });
      });

    setMarker(markers);
  }, [map, positions]);
};

export default useMap;
