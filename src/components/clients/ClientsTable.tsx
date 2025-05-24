"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PaginationComponent from "../all-products/PaginationComponent ";
import updateIcon from "../../../public/assets/img/icon/action-2.png";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import Image from "next/image";
import Link from "next/link";
import { OrderDataType } from "@/interFace/apiInterFace";
import ChartPreloader from "@/preloaders/ChartPreloader";
import NiceSelectThree from "@/utils/NiceSelectThree";

const ClientsTable = () => {
  const [clients, setClients] = useState<OrderDataType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [match, setMatch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);

  const selectHandler = () => {};

  const handleOpen = (id: string) => {
    setMatch(id);
    setOpen(!open);
  };

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_URL}success/search-clients?search=${searchValue}`
      )
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_URL}success/clientInfo?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setClients(res.data.products);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [page, limit]);
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

  return (
    <>
      <div className="cashier-content-area mt-[30px] px-7">
        <div className="cashier-salereturns-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
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
                    <h5>Buyer Email</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF">
                    <h5>Phone</h5>
                  </div>
                  <div className="cashier-salereturns-table-customerF">
                    <h5>paymentId</h5>
                  </div>
                  <div className="cashier-salereturns-table-companyF">
                    <h5>Name</h5>
                  </div>
                  <div className="cashier-salereturns-table-warehouseF">
                    <h5>date</h5>
                  </div>
                  <div className="cashier-salereturns-table-actionF">
                    <h5>Action</h5>
                  </div>
                </div>

                {clients.length ? (
                  clients.map((item) => (
                    <div
                      key={item._id}
                      className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                    >
                      <div className="cashier-salereturns-table-dateF ml-5">
                        <span> {item.buyerEmail} </span>
                      </div>
                      <div className="cashier-salereturns-table-referenceF">
                        <span> {item.Phone} </span>
                      </div>
                      <div className="cashier-salereturns-table-customerF">
                        <span> {item.paymentId} </span>
                      </div>
                      <div className="cashier-salereturns-table-companyF">
                        <span> {item.name} </span>
                      </div>
                      <div className="cashier-salereturns-table-warehouseF">
                        <span> {item.date} </span>
                      </div>
                      <div className="cashier-salereturns-table-actionF">
                        <div className="dropdown">
                          <button
                            onClick={() => handleOpen(item._id)}
                            className="common-action-menu-style"
                          >
                            Action
                            <i className="fa-sharp fa-solid fa-caret-down"></i>
                          </button>
                          <div
                            className="dropdown-list"
                            style={{
                              display: `${
                                item._id === match && open ? "block" : "none"
                              }`,
                            }}
                          >
                            <button className="dropdown-menu-item">
                              <Image src={updateIcon} alt="icon not found" />

                              <Link href={`/client-orders/${item._id}`}>
                                Details
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {loading ? (
                      <>
                        <ChartPreloader />
                      </>
                    ) : (
                      <>
                        <p className="text-center mt-5"> No Client Found </p>
                      </>
                    )}
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

export default ClientsTable;
