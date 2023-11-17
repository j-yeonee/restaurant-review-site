import styled from "styled-components";
import useMap from "../../../shared/hooks/useMap";

export const MapContainer = styled.div`
  width: 65%;
  height: 100vh;
  background-color: white;
  border-radius: 7px;
`;

const ReviewMap = ({ geoData, level }) => {
  useMap(geoData, level);

  return (
    <>
      <MapContainer id="map" />
    </>
  );
};

export default ReviewMap;
