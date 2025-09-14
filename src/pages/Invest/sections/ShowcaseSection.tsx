import { useEffect, useState } from "react";
import Card from "../blocks/Card.tsx";
import ConsultCard from "../blocks/ConsultCard.tsx";
import { API_URL } from "../../../constants/constants.tsx";
import type { Investment } from "../interfaces/interfaces.tsx";
import { useParams } from "react-router-dom";

type Investments = Investment[];
const maxCardsOnPage = 22;

interface ShowcaseProps {
  request: string;
}

export default function ShowcaseSection({ request }: ShowcaseProps) {
  const [investments, setInvestments] = useState<Investments>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { lng } = useParams();

  useEffect(() => {
    const fetchInvestments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}?lan=${lng?.toUpperCase()}${request}`);
        if (!res.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data: Investments = await res.json();
        setInvestments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [request, lng]);

  const [currentPage, setCurrectPage] = useState<number>(0);
  const startCardIdx = currentPage * maxCardsOnPage;
  const totalPages = Math.ceil(investments.length / maxCardsOnPage);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, [currentPage]);

  return (
    <div className="mb-5" key={currentPage}>
      {loading ? (
        <div className="flex justify-center items-center p-5">
          <span className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></span>
        </div>
      ) : (
        <>
          <CardsGrid
            investments={investments}
            currentPage={currentPage}
            startCardIdx={startCardIdx}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrectPage}
          />
        </>
      )}
    </div>
  );
}

function CardsGrid({
  investments,
  currentPage,
  startCardIdx,
}: {
  investments: Investment[];
  currentPage: number;
  startCardIdx: number;
}) {

  // первая страница
  if (currentPage === 0) {
    return (
      <div className="grid grid-cols-1 small:grid-cols-2 big:grid-cols-3 gap-x-4 gap-y-8">
        {investments.slice(0, 2).map((project) => (
          <Card key={project.id} {...project} />
        ))}
        <ConsultCard />
        {investments.slice(2, maxCardsOnPage).map((project) => (
          <Card key={project.id} {...project} />
        ))}
      </div>
    );
  }

  // остальные страницы
  return (
    <div className="grid grid-cols-1 small:grid-cols-2 big:grid-cols-3 gap-x-4 gap-y-8">
      {investments.slice(startCardIdx, startCardIdx + maxCardsOnPage).map((project) => (
        <Card key={project.id} {...project} />
      ))}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}

function Pagination({
  currentPage,
  totalPages,
  onChange,
  siblingCount = 1,
}: PaginationProps) {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => i + start);

  const paginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return range(0, totalPages - 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 2);

    const showLeftDots = leftSiblingIndex > 1;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const pages: (number | string)[] = [];
    pages.push(0);

    if (showLeftDots) pages.push("...");

    pages.push(...range(leftSiblingIndex, rightSiblingIndex));

    if (showRightDots) pages.push("...");

    pages.push(totalPages - 1);

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    onChange(page);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-3 py-1 rounded-lg border 
        disabled:opacity-50 hover:bg-gray-200 cursor-pointer"
      >
        ←
      </button>

      {paginationRange().map((page, idx) =>
        typeof page === "string" ? (
          <span key={idx} className="px-3 py-1">
            {page}
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-lg cursor-pointer ${
              page === currentPage
                ? "bg-darkblue text-white"
                : "hover:bg-gray-200 border"
            }`}
          >
            {page + 1}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-3 py-1 rounded-lg border disabled:opacity-50 
        hover:bg-gray-200 cursor-pointer"
      >
        →
      </button>
    </div>
  );
}
