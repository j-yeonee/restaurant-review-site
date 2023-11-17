import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../shared/components/context/SearchContext";

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

  return (
    <Container>
      결과!!
      {resolvedData.items &&
        resolvedData.items.map((item) => (
          <DetailBox>
            <div>{item.category}</div>
            <div>{item.title}</div>
            <div>{item.address}</div>
          </DetailBox>
        ))}
      여기는 검색 결과를 보여주는 페이지 입니다
    </Container>
  );
};

export default SearchPage;
