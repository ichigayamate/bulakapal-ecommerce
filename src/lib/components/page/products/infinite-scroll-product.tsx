"use client"

import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Products} from "@interfaces/products";
import {PaginatedData} from "@interfaces/api";
import ProductCard from "@components/page/products/products-card";
import {useRouter, useSearchParams} from "next/navigation";

const Loader = () => <div className="flex justify-center mt-4"><span
  className="loading loading-dots loading-md"></span></div>;

export default function AllProducts({initialData, searchQuery}: Readonly<{ initialData: PaginatedData<Products>, searchQuery: string }>) {
  const totalPage = Math.ceil(initialData.total / initialData.limit);
  const [currentPage, setCurrentPage] = useState(initialData.page);
  const [data, setData] = useState(initialData.data);
  const [hasMore, setHasMore] = useState(initialData.page < totalPage);

  const router = useRouter();
  const searchParams = useSearchParams();

  const next = async () => {
    const nextPage = currentPage + 1;
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    url.searchParams.set("page", String(nextPage));
    url.searchParams.set("limit", String(initialData.limit));
    url.searchParams.set("search", searchQuery);

    const response = await fetch(url.toString());
    const nextData: PaginatedData<Products> = await response.json();

    setData([...data, ...nextData.data]);
    setCurrentPage(nextPage);
    setHasMore(nextPage < totalPage);
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
      url.searchParams.set("search", searchQuery);
      url.searchParams.set("page", "1");
      url.searchParams.set("limit", String(initialData.limit));

      const response = await fetch(url.toString());
      const newData: PaginatedData<Products> = await response.json();

      setData(newData.data);
      setCurrentPage(1);
      setHasMore(newData.page < Math.ceil(newData.total / newData.limit));
    };

    fetchData();
  }, [searchQuery, initialData.limit]);

  useEffect(() => {
    router.refresh();
  }, [router, searchParams]);

  return <InfiniteScroll
    next={next}
    hasMore={hasMore}
    loader={<Loader/>}
    dataLength={data.length}>
    <div className="grid grid-cols-5 gap-4">
      {data.map((product: Products) => (
        <ProductCard data={product} key={String(product._id)}/>
      ))}
    </div>
  </InfiniteScroll>
}