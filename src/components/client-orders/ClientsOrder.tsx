"use client";
import { idType } from "@/interFace/interFace";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../all-products/PaginationComponent ";
import NiceSelectThree from "@/utils/NiceSelectThree";
const ClientsOrder = ({ id }: idType) => {
  const [clients, setClients] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    axios
      .get(
        `${process.env.BASE_URL}success/client-product?search=${searchValue}&id=${id}`
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}success/client-order/${id}?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setClients(res.data.products);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
      })
      .catch((e) => console.log(e));
  }, [page, limit, id]);
  // get search products

  const pageLimitArray = [
    {
      id: 1,
      value: 5,
    },
    {
      id: 2,
      value: 10,
    },
    {
      id: 3,
      value: 15,
    },
    {
      id: 4,
      value: 20,
    },
  ];

  const myClients = clients[0];
  console.log(myClients)
  const selectHandler = () => {};
  return (
    <>
      <div className="cashier-content-area mt-[30px] px-7">
        <div className="cashier-salereturns-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            {" "}
            {myClients?.name} Order Info{" "}
          </h4>

          <div className="cashier-table-header-search-area">
            <div className="grid grid-cols-12 gap-x-5 mb-7 pb-0.5">
              <div className="md:col-span-6 col-span-12">
                <div className="cashier-table-header-search relative maxSm:mb-4">
                  <input
                    type="text"
                    placeholder="Search List"
                    value={searchValue}
                    onChange={handleInputChange}
                  />
                  <span>
                    <i className="fa-light fa-magnifying-glass"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="cashier-salereturns-table-area">
            <div className="cashier-salereturns-table-innerD">
              <div className="cashier-salereturns-table-inner-wrapperD border border-solid border-grayBorder border-b-0 mb-7">
                <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
               
                  <div className="cashier-salereturns-table-dateF ml-5">
                    <h5>Product Name</h5>
                  </div>
                  <div className="cashier-salereturns-table-dateF">
                    <h5>Product Id</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF table-new-width">
                    <h5>Price</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF table-new-width">
                    <h5>Quantity</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF">
                    <h5>Total Price</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF">
                    <h5>date</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF">
                    <h5>payment Id</h5>
                  </div>
                </div>

                {products?.length ? (
                  <>
                    {products?.length &&
                      products?.map((item: any) => (
                        <div
                          key={item._id}
                          className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                        >
                         
                          <div className="cashier-salereturns-table-dateF ml-5">
                            <span> {item.productName} </span>
                          </div>

                          <div className="cashier-salereturns-table-referenceF table-new-width">
                            <span> {item.price} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF table-new-width">
                            <span> {item.totalCard} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF">
                            <span> {item.price * item.totalCard} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF">
                            <span> {item.orderDate} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF">
                          <span> {myClients?.paymentId} </span>
                          </div>
                          
                        </div>
                      ))}
                  </>
                ) : (
                  <>
                    {myClients?.orderProducts?.length &&
                      myClients?.orderProducts?.map((item: any) => (
                        <div
                          key={item._id}
                          className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                        >
                        
                          <div className="cashier-salereturns-table-dateF ml-5">
                            <span> {item.productName} </span>
                          </div>
                          <div className="cashier-salereturns-table-dateF">
                            <span> {item._id} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF table-new-width">
                            <span> {item.price} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF table-new-width">
                            <span> {item.totalCard} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF">
                            <span> {item.price * item.totalCard} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF">
                            <span> {item.orderDate} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF">
                          <span> {myClients?.paymentId} </span>
                          </div>
                        
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            <div className="cashier-pagination-area">
              <div className="cashier-pagination-wrapper">
                <div className="grid grid-cols-12">
                  <div className="single-input-field w-full">
                    <NiceSelectThree
                      options={pageLimitArray}
                      defaultCurrent={0}
                      onChange={selectHandler}
                      name=""
                      setLimit={setLimit}
                      className=""
                    />
                  </div>

                  <div className="lg:col-span-9 md:col-span-6 col-span-12">
                    <PaginationComponent
                      totalPages={totalPages}
                      currentPage={currentPage}
                      setPage={setPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientsOrder;
