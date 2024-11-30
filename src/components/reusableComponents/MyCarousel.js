// "use client";
// import React, { useEffect, useState } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import styles from "./MyCarousel.module.scss";
// import { Container, LinearProgress, Skeleton } from "@mui/material";
// import { useRouter } from "next/navigation";
// import CrudTable from "./CrudTable";

// const MyCarousel = () => {
//   const [sliderArticleList, setSliderArticleList] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     fetch(`/api/banner_list/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSliderArticleList(data?.article_url_list?.rows || []);
//       });
//   }, []);

//   const handleImageClick = (url) => {
//     router.push("/" + url);
//   };

//   return (
//     <Container maxWidth="lg">
//       <div className={styles.MyCarouselContainer}>
//         {sliderArticleList.length > 0 ? (
//           <Carousel autoPlay interval={10000} infiniteLoop>
//             {sliderArticleList.map((object, index) => (
//               <div
//                 key={"slider_" + index}
//                 style={{ cursor: "pointer" }}
//                 onClick={() => handleImageClick(object.url)}
//               >
//                 <img
//                   src={object.title_image}
//                   alt={"slider_" + object.url}
//                   style={
//                     object?.is_banner_fit_style
//                       ? {
//                           objectFit: "contain",
//                           height: "300px",
//                           width: "100%",
//                         }
//                       : object?.is_banner_stretch_style
//                       ? {
//                           height: "300px",
//                           width: "100%",
//                         }
//                       : {
//                           height: "300px",
//                           overflow: "hidden",
//                         }
//                   }
//                 />
//                 <p className="legend">{object.title}</p>
//               </div>
//             ))}
//           </Carousel>
//         ) : (
//           <Skeleton variant="rectangular" height={300} />
//           // <div
//           //   style={{
//           //     height: "300px",
//           //     width: "100%",
//           //     alignContent: "center",
//           //     verticalAlign: "middle",
//           //     textAlign: "center",
//           //   }}
//           // >
//           //   <LinearProgress color="error" />
//           // </div>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default MyCarousel;

"use client";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./MyCarousel.module.scss";
import { Container, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

const MyCarousel = () => {
  const [sliderArticleList, setSliderArticleList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/banner_list/`)
      .then((res) => res.json())
      .then((data) => {
        setSliderArticleList(data?.article_url_list?.rows || []);
      });
  }, []);

  const handleImageClick = (url) => {
    router.push("/" + url);
  };

  const customArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    zIndex: 2,
    cursor: "pointer",
    opacity: 0.7,
  };

  return (
    <Container maxWidth="lg">
      <div className={styles.MyCarouselContainer}>
        {sliderArticleList.length > 0 ? (
          // <Carousel
          //   autoPlay
          //   interval={10000}
          //   infiniteLoop
          //   renderArrowPrev={(onClickHandler, hasPrev) =>
          //     hasPrev && (
          //       <button
          //         type="button"
          //         onClick={onClickHandler}
          //         style={{ ...customArrowStyles, left: "10px" }}
          //       >
          //         &#8592;
          //       </button>
          //     )
          //   }
          //   renderArrowNext={(onClickHandler, hasNext) =>
          //     hasNext && (
          //       <button
          //         type="button"
          //         onClick={onClickHandler}
          //         style={{ ...customArrowStyles, right: "10px" }}
          //       >
          //         &#8594;
          //       </button>
          //     )
          //   }
          // >
          <Carousel
            autoPlay
            interval={10000}
            infiniteLoop
            showThumbs={false} // Thumbnail'leri devre dışı bırak
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  style={{ ...customArrowStyles, left: "10px" }}
                >
                  &#8592;
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  style={{ ...customArrowStyles, right: "10px" }}
                >
                  &#8594;
                </button>
              )
            }
          >
            {sliderArticleList.map((object, index) => (
              <div
                key={"slider_" + index}
                style={{ cursor: "pointer" }}
                onClick={() => handleImageClick(object.url)}
              >
                <img
                  src={object.title_image}
                  alt={"slider_" + object.url}
                  style={
                    object?.is_banner_fit_style
                      ? {
                          objectFit: "contain",
                          height: "300px",
                          width: "100%",
                        }
                      : object?.is_banner_stretch_style
                      ? {
                          height: "300px",
                          width: "100%",
                        }
                      : {
                          height: "300px",
                          overflow: "hidden",
                        }
                  }
                />
                <p className="legend">{object.title}</p>
              </div>
            ))}
          </Carousel>
        ) : (
          <Skeleton variant="rectangular" height={300} />
        )}
      </div>
    </Container>
  );
};

export default MyCarousel;
