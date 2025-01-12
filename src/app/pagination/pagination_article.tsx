// "use server";
// import CardItem from "../../components/reusableComponents/CardItem";
// import ArticleCard, {
//   ArticleProp,
// } from "../../components/reusableComponents/ArticleCard";

// export async function fetchArticle(
//   page: number,
//   size: number,
//   orderby: string,
//   search: string,
//   isSmallCards: boolean,
//   p0: { cache: string }
// ) {
//   let response;
//   let responseSize;
//   let data;
//   const pageSize = page * size;

//   if (search) {
//     responseSize = await fetch(
//       `${process.env.URL}/api/article/list_filter_size?&search=${search}`
//     );

//     const dataSize = await responseSize.json();
//     let listSize = dataSize?.article_list_size?.rows[0]?.count;

//     if (listSize >= pageSize) {
//       response = await fetch(
//         `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&search=${search}`
//       );
//       data = await response.json();
//     } else if (page == 1) {
//       response = await fetch(
//         `${process.env.URL}/api/article/list_filter?page=0&size=${listSize}&search=${search}`
//       );
//       data = await response.json();
//     } else if (listSize % size > 0) {
//       let lastPageSize = listSize % size;
//       response = await fetch(
//         `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&search=${search}&lastPageSize=${lastPageSize}`
//       );
//       data = await response.json();
//     } else {
//       data = null;
//     }
//   } else {
//     responseSize = await fetch(
//       `${process.env.URL}/api/article/list_filter_size?&order=${orderby}`
//     );

//     const dataSize = await responseSize.json();
//     let listSize = dataSize?.article_list_size?.rows[0].count;

//     if (listSize > pageSize) {
//       response = await fetch(
//         `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&order=${orderby}`
//       );
//       data = await response.json();
//     } else if (page == 1) {
//       response = await fetch(
//         `${process.env.URL}/api/article/list_filter?page=0&size=${listSize}&order=${orderby}`
//       );
//       data = await response.json();
//     } else if (listSize % size > 0) {
//       let lastPageSize = listSize % size;
//       response = await fetch(
//         `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&order=${orderby}&lastPageSize=${lastPageSize}`
//       );
//       data = await response.json();
//     } else {
//       data = null;
//     }
//   }

//   return data?.article_list?.rows?.map((item: ArticleProp, index: number) => (
//     <>
//       <CardItem
//         key={"CardItem_mainId" + item?.url}
//         url={item?.url}
//         title={item?.title}
//         topics={item?.topics.split(",")}
//         create_date={item?.create_date}
//         like_number={item?.like_number}
//         title_image={item?.title_image}
//         body={item?.description}
//         is_manuel_page={item?.is_manuel_page}
//         isSmallCardStyle
//         isManyCardsInRow={isSmallCards}
//       />
//     </>
//   ));
// }

"use server";
import CardItem from "../../components/reusableComponents/CardItem";
import ArticleCard, {
  ArticleProp,
} from "../../components/reusableComponents/ArticleCard";

export async function fetchArticle(
  page: number,
  size: number,
  orderby: string,
  search: string,
  isSmallCards: boolean,
  options?: { next?: { revalidate: number } }
) {
  let response;
  let responseSize;
  let data;
  const pageSize = page * size;

  if (search) {
    responseSize = await fetch(
      `${process.env.URL}/api/article/list_filter_size?&search=${search}`,
      options
    );

    const dataSize = await responseSize.json();
    let listSize = dataSize?.article_list_size?.rows[0]?.count;

    if (listSize >= pageSize) {
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&search=${search}`,
        options
      );
      data = await response.json();
    } else if (page == 1) {
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=0&size=${listSize}&search=${search}`,
        options
      );
      data = await response.json();
    } else if (listSize % size > 0) {
      let lastPageSize = listSize % size;
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&search=${search}&lastPageSize=${lastPageSize}`,
        options
      );
      data = await response.json();
    } else {
      data = null;
    }
  } else {
    responseSize = await fetch(
      `${process.env.URL}/api/article/list_filter_size?&order=${orderby}`,
      options
    );

    const dataSize = await responseSize.json();
    let listSize = dataSize?.article_list_size?.rows[0].count;

    if (listSize > pageSize) {
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&order=${orderby}`,
        options
      );
      data = await response.json();
    } else if (page == 1) {
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=0&size=${listSize}&order=${orderby}`,
        options
      );
      data = await response.json();
    } else if (listSize % size > 0) {
      let lastPageSize = listSize % size;
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&order=${orderby}&lastPageSize=${lastPageSize}`,
        options
      );
      data = await response.json();
    } else {
      data = null;
    }
  }

  return data?.article_list?.rows?.map((item: ArticleProp, index: number) => (
    <>
      <CardItem
        key={"CardItem_mainId" + item?.url}
        url={item?.url}
        title={item?.title}
        topics={item?.topics.split(",")}
        create_date={item?.create_date}
        like_number={item?.like_number}
        title_image={item?.title_image}
        body={item?.description}
        is_manuel_page={item?.is_manuel_page}
        isSmallCardStyle
        isManyCardsInRow={isSmallCards}
      />
    </>
  ));
}

// yukarıdaki haliyle sayfa düzgün çalışıyor fakat aşağıdaki haliyle az sayıdaki listelerde çoklama yapıyor

// "use server";
// import CardItem from "../../components/reusableComponents/CardItem";

// export async function fetchArticle(
//   page: number,
//   size: number,
//   orderby: string,
//   search: string,
//   isSmallCards: boolean,
//   options?: { next?: { revalidate: number } }
// ) {
//   const pageSize = page * size;
//   let response, data, listSize;

//   if (search) {
//     const responseSize = await fetch(
//       `${process.env.URL}/api/article/list_filter_size?search=${search}`,
//       options
//     );
//     const dataSize = await responseSize.json();
//     listSize = dataSize?.article_list_size?.rows[0]?.count || 0;

//     if (listSize > 0) {
//       const offset = Math.max(0, (page - 1) * size); // Negatif OFFSET engelleniyor
//       const currentPageSize = Math.min(size, listSize - offset); // Geçerli sayfa boyutu hesaplanıyor

//       response = await fetch(
//         `${process.env.URL}/api/article/list_filter?page=${page}&size=${currentPageSize}&search=${search}`,
//         options
//       );
//     }
//   } else {
//     const responseSize = await fetch(
//       `${process.env.URL}/api/article/list_filter_size?order=${orderby}`,
//       options
//     );
//     const dataSize = await responseSize.json();
//     listSize = dataSize?.article_list_size?.rows[0]?.count || 0;

//     if (listSize > 0) {
//       const offset = Math.max(0, (page - 1) * size); // Negatif OFFSET engelleniyor
//       const currentPageSize = Math.min(size, listSize - offset); // Geçerli sayfa boyutu hesaplanıyor

//       response = await fetch(
//         `${process.env.URL}/api/article/list_filter?page=${page}&size=${currentPageSize}&order=${orderby}`,
//         options
//       );
//     }
//   }

//   if (!response) {
//     return []; // Eğer listSize 0 ise, boş bir dizi döndür.
//   }

//   data = await response.json();
//   return data?.article_list?.rows?.map((item: any) => (
//     <CardItem
//       key={item.url}
//       url={item.url}
//       title={item.title}
//       topics={item.topics.split(",")}
//       create_date={item.create_date}
//       like_number={item.like_number}
//       title_image={item.title_image}
//       body={item.description}
//       isSmallCardStyle
//       isManyCardsInRow={isSmallCards}
//       is_manuel_page={undefined}
//     />
//   ));
// }
