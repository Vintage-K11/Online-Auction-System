import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "../pages/home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "../pages/home-sub-components/UpcomingAuctions";
import Leaderboard from "../pages/home-sub-components/Leaderboard";

// 🟣 Shimmer Components
const TextShimmer = ({ width = "w-48", height = "h-6" }) => (
  <div className={`bg-pink-100 animate-pulse rounded-md ${width} ${height}`} />
);

const ButtonShimmer = ({ width = "w-32", height = "h-10" }) => (
  <div className={`bg-pink-100 animate-pulse rounded-xl ${width} ${height}`} />
);

const CardShimmer = () => (
  <div className="bg-white animate-pulse p-4 rounded-md h-[96px] md:w-[48%] lg:w-[47%] 2xl:w-[24%]" />
);

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    { title: "Win Notification", description: "Highest bidder receives a winning email." },
    { title: "Payment & Fees", description: "Bidder pays; auctioneer pays 5% fee." },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading, allAuctions } = useSelector((state) => state.auction);

  const [pageLoading, setPageLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && allAuctions?.length > 0) {
      const timer = setTimeout(() => setPageLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [loading, allAuctions]);

  return (
    <section className="w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-[#FDF6F9]">
      <div>
        {pageLoading ? (
          <>
            <TextShimmer width="w-60" height="h-6" />
            <TextShimmer width="w-full" height="h-12" />
            <TextShimmer width="w-full" height="h-12" />
            <div className="flex gap-4 my-8">
              <ButtonShimmer width="w-28" />
              <ButtonShimmer width="w-28" />
            </div>
          </>
        ) : (
          <>
            <p className="text-[#A855F7] font-semibold text-xl mb-6">
              Transparency Leads to Your Victory
            </p>

            <h1 className="text-[#1F1F1F] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
              Transparent Auctions
            </h1>

            <h1 className="text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-600">
              Be The Winner
            </h1>

            <div className="flex gap-4 my-8">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/sign-up"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold text-lg rounded-lg px-8 py-2 transition-all duration-300 shadow-md"
                  >
                    Sign Up
                  </Link>

                  <Link
                    to="/login"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 border-2 border-purple-400 hover:bg-purple-50 hover:text-black font-bold text-lg rounded-lg px-8 py-2 transition-all duration-300 shadow-md"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {pageLoading ? (
          <TextShimmer width="w-40" height="h-6" />
        ) : (
          <h3 className="text-[#181818] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            How it works
          </h3>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
          {pageLoading
            ? [...Array(4)].map((_, i) => <CardShimmer key={i} />)
            : howItWorks.map((element) => (
                <div
                  key={element.title}
                  className="bg-white flex flex-col gap-2 p-4 rounded-lg h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] hover:shadow-md border border-[#f2d8f1] transition-all duration-300"
                >
                  <h5 className="font-bold text-[#5E2571]">{element.title}</h5>
                  <p className="text-sm text-[#333]">{element.description}</p>
                </div>
              ))}
        </div>
      </div>

      <FeaturedAuctions loading={pageLoading} searchQuery={searchQuery} />
      <UpcomingAuctions loading={pageLoading} />
      <Leaderboard loading={pageLoading} />
    </section>
  );
};

export default Home;
