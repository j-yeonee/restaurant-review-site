import styled from "styled-components";
import { Card, Button } from "../../../../shared/components/styles/UIElements";
import { useEffect, useState, useContext } from "react";
import { LocationContext } from "../../../../shared/components/context/LocationContext";
import { useInView } from "react-intersection-observer";
import CategoryItemContent from "./CategoryItemContent";

import dummyData from "../../../../dummyData";
import axios from "axios";

export const CategoryInfo = styled.div`
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

const CategoryItem = () => {
  const { state } = useContext(LocationContext);
  const { sid, sig, emd, allAdr } = state;

  const [categoryData, setCategoryData] = useState([]);
  const [randomImg, setRandomImg] = useState(() => {});
  // const [alladrlend, lendering] = useState(false);
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

      setCategoryData((prevData) => [...prevData, ...results]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // allAdr이 변경되면 페이지를 다시 1로 초기화하고 새로운 데이터를 요청
    if (allAdr) {
      setPage(1);
      fetchData(0, 3); // 처음 3개의 데이터를 요청
    }

    const getRandomImagePath = () => {
      return Math.floor(Math.random() * 30) + 1;
    };

    setRandomImg(getRandomImagePath);
  }, [allAdr]);

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, "무한 스크롤 요청 🎃"); // 실행할 함수
      const startIndex = (page - 1) * 3;
      const endIndex = startIndex + 3;
      fetchData(startIndex, endIndex);

      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  // useEffect(() => {
  //   const getRandomImagePath = () => {
  //     return Math.floor(Math.random() * 30) + 1;
  //   };

  //   setRandomImg(getRandomImagePath);
  // }, [allAdr]);

  console.log(categoryData);

  return (
    <>
      {categoryData && (
        <>
          {categoryData.map((categoryItemPromise, index) => {
            // 각 Promise 객체를 기다립니다.
            return (
              <Card key={index}>
                <CategoryInfo>
                  <div>
                    {categoryItemPromise.icon} {categoryItemPromise.category}
                  </div>
                  <div>
                    <span>
                      {sid} {sig} {emd}
                    </span>
                    추천 맛집
                  </div>
                  <Button>자세히보기</Button>
                </CategoryInfo>
                <CategoryItemContent
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

// ----------- 0000 아래는 더미 데이터 10개로 한정한 코드 --------------

// const CategoryItem = () => {
//   const { state } = useContext(LocationContext);
//   const { sid, sig, emd, allAdr } = state;

//   const [categoryData, setCategoryData] = useState();
//   const [randomImg, setRandomImg] = useState(() => {});

//   useEffect(() => {
//     const getRandomImagePath = () => {
//       return Math.floor(Math.random() * 30) + 1;
//     };

//     setRandomImg(getRandomImagePath);
//   }, [allAdr]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
//       const client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

//       try {
//         const results = await Promise.all(
//           dummyData.map(async (item) => {
//             const { category, id, icon } = item;
//             const query = `${sid} ${sig} ${emd} ${category} 맛집`;
//             const url = `/v1/search/local.json?display=5&start=1&sort=random&query=${query}`;

//             const response = await axios.get("/n_api" + url, {
//               headers: {
//                 "X-Naver-Client-Id": client_id,
//                 "X-Naver-Client-Secret": client_secret,
//               },
//             });

//             return { category, id, icon, items: response.data.items };
//           })
//         );
//         setCategoryData(results);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     fetchData();
//   }, [allAdr]);

//   console.log(categoryData);

//   return (
//     <>
//       {categoryData && (
//         <>
//           {categoryData.map((categoryItemPromise) => {
//             // 각 Promise 객체를 기다립니다.
//             return (
//               <Card key={categoryItemPromise.id}>
//                 <CategoryInfo>
//                   <div>
//                     {categoryItemPromise.icon} {categoryItemPromise.category}
//                   </div>
//                   <div>
//                     <span>
//                       {sid} {sig} {emd}
//                     </span>
//                     추천 맛집
//                   </div>
//                   <Button>자세히보기</Button>
//                 </CategoryInfo>
//                 <CategoryItemContent
//                   categoryItemPromise={categoryItemPromise}
//                   randomImg={randomImg}
//                 />
//               </Card>
//             );
//           })}
//         </>
//       )}
//     </>
//   );
// };

export default CategoryItem;
