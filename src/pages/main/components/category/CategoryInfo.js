import styled from "styled-components";
import { getRandomImagePath } from "../../../../shared/util/getRandomImagePath";
import { Card, Button } from "../../../../shared/components/styles/UIElements";
import { LocationContext } from "../../../../shared/context/LocationContext";
import { CategoryContext } from "../../../../shared/context/CategoryContext";
import { useEffect, useState, useContext } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import CategoryContent from "./CategoryContent";
import dummyData from "../../../../dummyData";
import axios from "axios";

export const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  background-color: #eeeeee;

  span {
    color: #ed8b2e;
    font-weight: 800;
  }
`;

const CategoryInfo = () => {
  // Use the useContext hook for each context separately
  const locationContext = useContext(LocationContext);
  const categoryContext = useContext(CategoryContext);

  // Destructure state and actions from each context
  const { sid, sig, emd, allAdr } = locationContext.state;
  const { categoryData } = categoryContext.state;
  const { setCategoryData } = categoryContext.actions;

  const [randomImg, setRandomImg] = useState();
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
  const client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  const fetchData = async (startIndex, endIndex) => {
    try {
      const results = await Promise.all(
        dummyData.slice(startIndex, endIndex).map(async (item) => {
          const { category, id, icon } = item;
          const query = `${sid} ${sig} ${emd} ${category} 맛집`;
          const url = `/v1/search/local.json?display=5&start=1&sort=random&query=${query}`;

          const response = await axios.get("/n_api" + url, {
            headers: {
              "X-Naver-Client-Id": client_id,
              "X-Naver-Client-Secret": client_secret,
            },
          });
          console.log("주소 정보!!! : ", query);
          return { category, id, icon, items: response.data.items };
        })
      );

      page === 1
        ? setCategoryData(results)
        : setCategoryData((prevData) => [...prevData, ...results]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // allAdr이 변경되면 페이지를 다시 1로 초기화하고 새로운 데이터를 요청
    if (allAdr) {
      setPage(1);
      setCategoryData([]);
      fetchData(0, 3); // 처음 3개의 데이터를 요청
    }

    setRandomImg(getRandomImagePath);
  }, [allAdr]);

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, "무한 스크롤 요청 🎃"); // 실행할 함수

      const startIndex = (page - 1) * 3;
      const endIndex = startIndex + 3;
      const DebounceFetch = debounce(() => {
        fetchData(startIndex, endIndex);
      }, 300);

      DebounceFetch();

      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  console.log(categoryData);

  return (
    <>
      {categoryData && (
        <>
          {categoryData.map((categoryItemPromise, index) => {
            // 각 Promise 객체를 기다립니다.
            return (
              <Card key={index}>
                <Category>
                  <div>
                    {categoryItemPromise.icon} {categoryItemPromise.category}
                  </div>
                  <div>
                    <span>
                      {sid} {sig} {emd}
                    </span>
                    추천 맛집
                  </div>
                  <Link to={`/list/${categoryItemPromise.id}`}>
                    <Button>자세히보기</Button>
                  </Link>
                </Category>
                <CategoryContent
                  categoryItemPromise={categoryItemPromise}
                  randomImg={randomImg}
                />
              </Card>
            );
          })}
          <div ref={ref}>로딩 중이요~</div>
        </>
      )}
    </>
  );
};

export default CategoryInfo;
