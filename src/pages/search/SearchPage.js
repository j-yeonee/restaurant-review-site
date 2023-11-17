import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../shared/context/SearchContext";
import SearchMap from "./components/SearchMap";

export const Section = styled.main`
  background-color: #f5f7f6;
  height: auto;
`;

export const Container = styled.div`
  max-width: 700px;
  height: 100vh;
`;

export const DetailBox = styled.div`
  margin: 1em;
  background-color: #eeeeee;
`;

const SearchPage = () => {
  const searchContext = useContext(SearchContext);
  const { searchData } = searchContext.state;
  const [resolvedData, setResolvedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedData = await searchData; // Promise가 해결될 때까지 대기
        setResolvedData(resolvedData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [searchData]);

  console.log(resolvedData);

  return (
    <Section>
      <div className="container">
        <Container>
          결과!!
          {resolvedData.items &&
            resolvedData.items.map((item) => (
              <Link
                to={`/review/${item.mapx}${item.mapy}`}
                state={{ itemData: item }}
                key={`${item.mapx}${item.mapy}`}
              >
                <DetailBox>
                  <div>{item.category}</div>
                  <div>{item.title}</div>
                  <div>{item.address}</div>
                </DetailBox>
              </Link>
            ))}
          여기는 검색 결과를 보여주는 페이지 입니다
          <SearchMap geoData={resolvedData} level={13} />
        </Container>
      </div>
    </Section>
  );
};

export default SearchPage;
