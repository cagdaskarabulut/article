"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { fetchArticle } from "../../app/pagination/pagination_article";

let page = 2;
let rowForPage = 5;
export type ArticleCard = JSX.Element;

function LoadMore({orderType,search,totalListSize}) {
  const { ref, inView } = useInView();

  const [data, setData] = useState<ArticleCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    page = 2;
    setIsFinished(false);
    setData([]);
    setIsLoading(false);
  }, [orderType, search]);

  useEffect(() => {
     
    if (inView && !isFinished) {
      setIsLoading(true);
      const delay = 200;
      const timeoutId = setTimeout(() => {

        if(totalListSize<(page*rowForPage)){
          setIsFinished(true);
        } else {
          fetchArticle(page,rowForPage,orderType,search).then((res) => {
            if (res){
              setData([...data, ...res]);
              page++;
            } else {
              setIsFinished(true);
            }
            setIsLoading(false);  
          });
        }
      }, delay);
      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
    setIsLoading(false);
  }, [inView, data, isLoading]);

  return (
    <>
      <section>
        {data}
      </section>
      <br />
      <section>
        <div ref={ref} style={{width: "100%", display: "flex", justifyContent: "center"}}>
          {inView && isLoading && !isFinished && (
            <>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
            </>
          )}
        </div>
      </section>
      <style jsx global>{`
        body {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
}

export default LoadMore;
